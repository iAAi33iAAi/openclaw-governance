/// OpenClaw Governance — Aethel Grid Safety Kernel
/// Rust sovereignty enforcement layer.
///
/// Every action that enters the OpenClaw system passes through
/// this kernel before it reaches colony agents or the love-quality engine.
/// The kernel enforces three invariants:
///   1. Sovereignty — the action must not violate self-determination
///   2. Non-extraction — the action must not extract without reciprocity
///   3. Consent — the action must be authorized by the relevant agent(s)
///
/// If any invariant fails, the kernel emits a `KernelViolation` and
/// the action is halted. No partial execution.

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use thiserror::Error;
use tracing::{error, info, warn};
use uuid::Uuid;

// ─── Domain Types ──────────────────────────────────────────────

/// Unique identifier for an agent in the colony.
pub type AgentId = String;

/// Unique identifier for an action submitted to the kernel.
pub type ActionId = Uuid;

/// Sovereignty clearance level (0 = public, 1 = colony, 2 = origin-architect).
pub type ClearanceLevel = u8;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum ActionType {
    GovernanceProposal,
    ResourceFlow,
    ConsensusVote,
    AgentDispatch,
    AbundanceDistribution,
    ArchiveWrite,
    EmergencyHalt,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct KernelAction {
    pub id: ActionId,
    pub action_type: ActionType,
    pub submitter: AgentId,
    pub target_agents: Vec<AgentId>,
    pub payload: serde_json::Value,
    pub clearance_required: ClearanceLevel,
    pub submitted_at: DateTime<Utc>,
    pub love_quality_score: f64,
    pub sovereignty_token: Option<String>,
}

impl KernelAction {
    pub fn new(
        action_type: ActionType,
        submitter: AgentId,
        target_agents: Vec<AgentId>,
        payload: serde_json::Value,
        clearance_required: ClearanceLevel,
        love_quality_score: f64,
    ) -> Self {
        Self {
            id: Uuid::new_v4(),
            action_type,
            submitter,
            target_agents,
            payload,
            clearance_required,
            submitted_at: Utc::now(),
            love_quality_score,
            sovereignty_token: None,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct KernelVerdict {
    pub action_id: ActionId,
    pub approved: bool,
    pub sovereignty_intact: bool,
    pub extraction_detected: bool,
    pub consent_verified: bool,
    pub violations: Vec<String>,
    pub verdict_at: DateTime<Utc>,
}

// ─── Errors ─────────────────────────────────────────────────────

#[derive(Debug, Error)]
pub enum KernelViolation {
    #[error("Sovereignty violation: {0}")]
    SovereigntyViolation(String),

    #[error("Extraction detected: {0}")]
    ExtractionDetected(String),

    #[error("Consent not verified for agent(s): {0:?}")]
    ConsentMissing(Vec<AgentId>),

    #[error("Love quality score {score:.3} below kernel threshold {threshold:.3}")]
    LoveQualityTooLow { score: f64, threshold: f64 },

    #[error("Clearance level {required} required; submitter has {actual}")]
    InsufficientClearance { required: u8, actual: u8 },
}

// ─── Kernel ──────────────────────────────────────────────────────

/// Minimum love quality score accepted by the kernel.
const KERNEL_LOVE_THRESHOLD: f64 = 0.80;

/// Known extraction patterns.
const EXTRACTION_SIGNATURES: &[&str] = &[
    "private_fork",
    "capture",
    "exploit",
    "bypass_consensus",
    "override_sovereignty",
    "harvest_without_return",
];

pub struct AethelSafetyKernel {
    agent_registry: HashMap<AgentId, ClearanceLevel>,
    consent_ledger: HashMap<ActionId, Vec<AgentId>>,
    audit_log: Vec<KernelVerdict>,
}

impl AethelSafetyKernel {
    pub fn new() -> Self {
        let mut registry = HashMap::new();
        for agent in &[
            "agent-guardian", "agent-healer", "agent-builder",
            "agent-keeper", "agent-weaver", "agent-scout", "agent-oracle",
        ] {
            registry.insert(agent.to_string(), 1u8);
        }
        registry.insert("origin-architect".to_string(), 2u8);
        Self {
            agent_registry: registry,
            consent_ledger: HashMap::new(),
            audit_log: Vec::new(),
        }
    }

    pub fn register_agent(&mut self, agent_id: AgentId, clearance: ClearanceLevel) {
        info!("Registering agent {} with clearance {}", agent_id, clearance);
        self.agent_registry.insert(agent_id, clearance);
    }

    pub fn record_consent(&mut self, action_id: ActionId, agent_id: AgentId) {
        self.consent_ledger.entry(action_id).or_default().push(agent_id.clone());
        info!("Consent recorded: agent={} action={}", agent_id, action_id);
    }

    pub fn validate(&mut self, action: &KernelAction) -> KernelVerdict {
        let mut violations = Vec::new();
        let mut sovereignty_intact = true;
        let mut extraction_detected = false;
        let mut consent_verified = true;

        if action.love_quality_score < KERNEL_LOVE_THRESHOLD {
            let msg = format!("Love quality {:.3} < threshold {:.3}",
                action.love_quality_score, KERNEL_LOVE_THRESHOLD);
            warn!("{}", msg);
            violations.push(msg);
            sovereignty_intact = false;
        }

        let payload_str = action.payload.to_string().to_lowercase();
        for sig in EXTRACTION_SIGNATURES {
            if payload_str.contains(sig) {
                let msg = format!("Extraction signature '{}' detected", sig);
                error!("{}", msg);
                violations.push(msg);
                extraction_detected = true;
                sovereignty_intact = false;
            }
        }

        let submitter_clearance = self.agent_registry.get(&action.submitter).copied().unwrap_or(0);
        if submitter_clearance < action.clearance_required {
            let msg = format!("Clearance {} required; {} has {}",
                action.clearance_required, action.submitter, submitter_clearance);
            warn!("{}", msg);
            violations.push(msg);
            sovereignty_intact = false;
        }

        if !action.target_agents.is_empty() {
            let consented = self.consent_ledger.get(&action.id).cloned().unwrap_or_default();
            let missing: Vec<AgentId> = action.target_agents.iter()
                .filter(|a| !consented.contains(a)).cloned().collect();
            if !missing.is_empty() {
                let msg = format!("Consent missing for agents: {:?}", missing);
                warn!("{}", msg);
                violations.push(msg);
                consent_verified = false;
            }
        }

        let verdict = KernelVerdict {
            action_id: action.id,
            approved: violations.is_empty(),
            sovereignty_intact,
            extraction_detected,
            consent_verified,
            violations,
            verdict_at: Utc::now(),
        };

        if verdict.approved {
            info!("Kernel approved action {}", action.id);
        } else {
            error!("Kernel REJECTED action {} — violations: {:?}", action.id, verdict.violations);
        }

        self.audit_log.push(verdict.clone());
        verdict
    }

    pub fn audit_log(&self) -> &[KernelVerdict] { &self.audit_log }
    pub fn approved_count(&self) -> usize { self.audit_log.iter().filter(|v| v.approved).count() }
    pub fn rejected_count(&self) -> usize { self.audit_log.iter().filter(|v| !v.approved).count() }
}

impl Default for AethelSafetyKernel {
    fn default() -> Self { Self::new() }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn make_action(love_score: f64, payload: serde_json::Value) -> KernelAction {
        KernelAction::new(
            ActionType::GovernanceProposal,
            "agent-guardian".to_string(),
            vec![],
            payload, 1, love_score,
        )
    }

    #[test]
    fn test_high_love_quality_passes() {
        let mut kernel = AethelSafetyKernel::new();
        let action = make_action(0.92, json!({"proposal": "build a garden"}));
        let verdict = kernel.validate(&action);
        assert!(verdict.approved);
        assert!(verdict.sovereignty_intact);
        assert!(!verdict.extraction_detected);
    }

    #[test]
    fn test_low_love_quality_rejected() {
        let mut kernel = AethelSafetyKernel::new();
        let action = make_action(0.50, json!({"proposal": "cut benefits"}));
        let verdict = kernel.validate(&action);
        assert!(!verdict.approved);
    }

    #[test]
    fn test_extraction_detected() {
        let mut kernel = AethelSafetyKernel::new();
        let action = make_action(0.95, json!({"op": "private_fork the substrate"}));
        let verdict = kernel.validate(&action);
        assert!(!verdict.approved);
        assert!(verdict.extraction_detected);
    }

    #[test]
    fn test_consent_gate() {
        let mut kernel = AethelSafetyKernel::new();
        let mut action = make_action(0.90, json!({"proposal": "redistribute surplus"}));
        action.target_agents = vec!["agent-healer".to_string(), "agent-builder".to_string()];
        let verdict = kernel.validate(&action);
        assert!(!verdict.approved);
        assert!(!verdict.consent_verified);
        kernel.record_consent(action.id, "agent-healer".to_string());
        kernel.record_consent(action.id, "agent-builder".to_string());
        let verdict2 = kernel.validate(&action);
        assert!(verdict2.approved);
    }
}
