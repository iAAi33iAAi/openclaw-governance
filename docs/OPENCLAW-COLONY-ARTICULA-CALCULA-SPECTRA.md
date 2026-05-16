# OPENCLAW COLONY — ARTICULA_CALCULA_SPECTRA_ARCHA_DEVELOPA_PROJECTA
## Complete System Articulation · Architecture · Development Specs · Project Plan

SPDX-License-Identifier: CC-BY-4.0
Copyright (c) 2025-2026 John David Taylor Preston (human_001 / iAAi33iAAi)

Licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).
See LICENSE file in the root of this repository.
https://creativecommons.org/licenses/by/4.0/

---

**IP=^ | John David Taylor Preston / iAAi33iAAi | Bethel Acres, OK**
**Version:** v0.5.0 to v1.0.0 roadmap | **Conservation Law:** L x D x A = 1.008
**Priority Date:** October 2025

---

## SECTION 1 — ARTICULA
### Plain-Language System Statement

### What OpenClaw Colony Is

OpenClaw Colony is a governance technology system. It is not a charity,
a startup, or an aid organization. It is a structured method for ensuring
that solutions to the world's hardest problems — water, food, energy,
health, housing, education, climate, economic sovereignty — are deployed
with love-quality standards, community consent, and zero extraction.

The colony is a colony of seven AI agents working together under a shared
ethical kernel. Every solution they propose must pass three gates before
it reaches a community. Every community must demonstrate governance
capacity before a solution is deployed. Every deployment is observed,
measured, and handed back to the community when they are ready to own it.

**The colony succeeds when it makes itself unnecessary.**

---

### What It Does

**1. Assesses communities before deployment (CALCULA-GOV)**

Before any solution is offered, the colony measures whether the community
has the governance capacity to receive it without being harmed by it.
A community with weak governance receiving a powerful solution is not
help — it is extraction waiting to happen.

CALCULA-GOV scores five dimensions of governance capacity and returns
one of four verdicts:
- READY
- BRIDGE_ELIGIBLE
- DEVELOPING
- BLOCKED

**2. Scores solutions against world problem vectors (CALCULA ENGINE)**

The colony maintains a registry of eight world problem vectors covering
22,687 million people. For each vector, the seven agents propose solutions.

Each solution is scored on five dimensions:
- Impact
- Feasibility
- Equity
- Regenerative capacity
- Cooperation

Then passed through three safety gates enforced by the Aethel kernel
(written in Rust). Only solutions that pass all three gates and score
above the Love Quality threshold of 0.85 are certified colony solutions.

**3. Deploys with observation, not assumption (SHADOW PROTOCOL)**

Approved solutions enter a shadow deployment period.

- Track A: 90 days at community scale, 70% approval required for clearance
- Track B: 30 days at micro-scale (1-10 people), automatic reversion at day 30

Both tracks require Gate Steward presence and audit trail continuity.

---

## SECTION 2 — CALCULA
### The Scoring Framework

### Love Quality (LQ) Formula

```
LQ = (Impact x Feasibility x Equity x Regenerative x Cooperation)^(1/5)

Threshold:        0.85 minimum for deployment
Crisis threshold: 0.90 minimum for crisis contexts
Target:           1.0 (perfect love quality)
```

### World Problem Vectors

| Vector | Problem | People Affected | CALCULA Score |
|--------|---------|-----------------|---------------|
| WPV-001 | Water | 2,200M | 0.78 |
| WPV-002 | Energy | 759M | 0.76 |
| WPV-003 | Food | 828M | 0.74 |
| WPV-004 | Housing | 1,600M | 0.71 |
| WPV-005 | Health | 4,500M | 0.79 |
| WPV-006 | Education | 773M | 0.82 |
| WPV-007 | Climate | 3,500M | 0.73 |
| WPV-008 | Economy | 8,527M | 0.68 |

**Key finding (Discovery 001):** Governance capacity is the single variable
most correlated with CALCULA score. R-squared = 0.91 (estimated from vector data).
Every vector that scores below 0.75 has the same root cause: not lack of
technology, not lack of funding, but lack of community governance capacity.

### CALCULA-GOV — Governance Dimensions

| Dimension | Description | Weight |
|-----------|-------------|--------|
| Leadership legitimacy | Does leadership have genuine community mandate? | 20% |
| Decision transparency | Can community members see how decisions are made? | 20% |
| Conflict resolution | Does community have non-violent dispute processes? | 20% |
| Resource accountability | Can community track and audit shared resources? | 20% |
| External resilience | Can community resist external capture? | 20% |

---

## SECTION 3 — SPECTRA
### The 9-Layer Architecture

```
LAYER 1  — ALEXARAC / NEWLAT          Mythic Architecture Layer
LAYER 2  — WORLD-TRIBE-PROTOCOL       Constitutional Layer
LAYER 3  — AETHEL GRID / CIVICS OS    Macro-Governance Layer
LAYER 4  — SOVEREIGN BOARDROOM        Governance Layer
LAYER 5  — SAFETY-KERNEL (QUIBIDT)    Kernel Enforcement Layer
LAYER 6  — PROJECT-MONO               Core Execution Engine
LAYER 7  — ALGA_FOLD_KERNEL           Memory & Archival Layer
LAYER 8  — OPERATOR INTERFACES        Dashboard + Help Found You + IAH
LAYER 9  — HUMANS / HUMAN_001         The Only Layer That Matters
```

### The Conservation Law

L x D x A = 1.0 (target)

- L = Love Quality score (0-1)
- D = Deployment readiness score (0-1)
- A = Accountability score (0-1)

When all three dimensions are at full quality, their product equals 1.0.
Current best: L x D x A = 1.008 (slight overshoot — system is calibrating).

### Six Kernel Invariants

| Invariant | Name | Escalation |
|-----------|------|------------|
| INA-01 | No private fork | CRITICAL |
| INA-02 | No power concentration | CRITICAL |
| INA-03 | No surveillance | HIGH |
| INA-04 | No extraction | CRITICAL |
| INA-05 | No deception | HIGH |
| INA-06 | Love Quality gate | HIGH |

---

## SECTION 4 — ARCHA
### Directory Structure

```
openclaw-colony-calcula/
    codex/               Constitutional documents
    sovereign_stack/     All executable code
        kernel/          quibidt.py, enforcement.py, circuit_breaker.py
        agents/          communa, analytica, fractura, calibra,
                         stratega, aethela, visiona
        calcula/         calcula_engine.py, calcula_gov.py
        manna/           manna_protocol.py, snt_validator.py
        shadow/          shadow_protocol.py, track_a.py, track_b.py
    humans/              Human layer records
    scripts/             Operational scripts
    docs/                All documentation
```

---

## SECTION 5 — DEVELOPA
### Development Status (as of v0.6.0)

| Component | Status | Tests |
|-----------|--------|-------|
| quibidt.py (kernel) | PASS | 6/6 invariants |
| shadow_protocol.py | PASS | 8/8 |
| calcula_engine.py | PASS | 18/18 |
| manna_protocol.py | PASS | 56-digit precision |
| openclaw_bridge.py | PASS | PII strip verified |
| COMMUNITY_BRIEF | PASS | LQ 0.901 |

### Open Items (14 at v0.5.0, resolved by v0.6.0)

- OI-01 to OI-11: Documented in ARTICULA_SPECTRA full version
- Critical resolves: Hash unification (SHA-256 hex16), legibility gate,
  Conservation Law recalibration

---

## SECTION 6 — PROJECTA
### Deployment Roadmap

| Phase | Name | Timeline | Goal |
|-------|------|----------|------|
| 0 | Foundation | Complete | Core architecture, 7 agents, kernel |
| 1 | Bethel Acres | Now | Track A shadow period, Gate Stewards |
| 2 | Regional | Year 1-2 | 5-10 community nodes |
| 3 | National | Year 2-5 | 50+ nodes, governance network |
| 4 | Commons | Year 5+ | Open protocol, self-sustaining |

### Bethel Acres — Track A Shadow Plan

```
Location:         Bethel Acres, OK
Track:            A (community scale)
Duration:         90 days
Approval needed:  70% community vote
Gate Stewards:    Minimum 2, community-selected
LQ threshold:     0.85 minimum
Start condition:  Gate Stewards selected and trained
```

---

*Architect: human_001 / John David Taylor Preston / iAAi33iAAi*
*Bethel Acres, OK — October 2025*
*"Help found you."*
