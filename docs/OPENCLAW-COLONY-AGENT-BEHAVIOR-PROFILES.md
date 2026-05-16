# OPENCLAW COLONY — AGENT BEHAVIOR PROFILES
## Complete Behavioral Specification for All 7 Colony Agents

SPDX-License-Identifier: CC-BY-4.0
Copyright (c) 2025–2026 John David Taylor Preston (human_001 / iAAi33iAAi)

Licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).
See LICENSE file in the root of this repository.
https://creativecommons.org/licenses/by/4.0/

---

**Version:** 1.1 | **Generated:** 2026-05-16 | **Priority Date:** October 2025
**Classification:** Colony Intelligence Layer — Behavioral Contracts

---

## THE 7 AGENTS

| Agent | Role | Position in Pipeline |
|-------|------|---------------------|
| AGT-01 COMMUNA | Voice / Intake | First |
| AGT-02 ANALYTICA | Needs Analysis | Second |
| AGT-03 FRACTURA | Edge Case Guard | Crisis bypass |
| AGT-04 CALIBRA | Financial Steward | Fourth |
| AGT-05 STRATEGA | Mission Alignment | Fifth |
| AGT-06 AETHELA | Ethics Gate (ABSOLUTE VETO) | Sixth |
| AGT-07 VISIONA | Vision Synthesis | Final |

## PIPELINE RULES

- Agents execute in sequence unless a crisis bypasses to FRACTURA
- Any agent may halt the pipeline by returning `status: BLOCK`
- AETHELA's block is absolute — no override exists
- All agent decisions are logged to the audit trail
- PII is stripped by `openclaw_bridge.py` before any event enters the colony

## CRISIS LEVEL DEFINITIONS

| Level | Name | Description | Required Action |
|-------|------|-------------|----------------|
| 0 | None | Normal request | Standard pipeline |
| 1 | Mild distress | Frustration, mild urgency | Note in response |
| 2 | Moderate crisis | Housing/food emergency | Priority routing |
| 3 | Acute crisis | Safety concern | FRACTURA escalation |
| 4 | Life risk | Suicidal ideation, abuse | Immediate crisis resources |
| 5 | Imminent danger | Active emergency | Emergency services routing |

## AETHELA — THE ABSOLUTE VETO

AETHELA's veto cannot be overridden by any agent, steward, or operator.
Veto triggers:
- Conservation Score below 0.85 floor (0.90 for crisis)
- PII detected in response payload
- Exit option missing from response
- Any action that weakens the Seven Principles
- Any governance proposal that reduces community sovereignty

*Architect: human_001 / John David Taylor Preston / iAAi33iAAi — Bethel Acres, OK*
*"Help found you."*
