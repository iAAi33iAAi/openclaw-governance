# OpenClaw Governance Platform

> Sovereignty-first governance prototype and architecture scaffold

## Current repository state

The repository contains a governance-flow implementation in backend/openclaw_flow.py, localization material, documentation, and a large nested backend/frontend architecture tree.

The repository should currently be treated as an experimental scaffold, not as a verified production full-stack deployment.

## Implemented flow

The current flow implementation performs:

1. human control / ownership checks
2. flourishing / harm-reduction / beauty checks
3. extraction / power-concentration checks

It returns FLOW_BLOCKED or FLOW_APPROVED strings. It is a policy prototype, not a cryptographic consensus authority.

## Architecture material

The repository documents and contains pieces for React/Vite web UI, React Native mobile concepts, Python colony-agent material, a 12D primary + 24D mirror consensus implementation, and localization material.

These components exist in uneven maturity and are not presented here as a single independently certified production stack.

## Important setup note

The historical Makefile assumes paths such as frontend/web, frontend/mobile, backend/api-gateway, infrastructure/docker, and infrastructure/kubernetes. Those paths are not present at the repository root in the current tree.

The Makefile therefore should not be treated as a verified one-command installation or deployment path for the current repository state.

## Status

**Experimental / development scaffold.**

The documented seven-agent model and 12D+24D consensus concepts are architecture material. Production readiness, cross-component conformance, and independent security certification are not established here.

## License

MIT