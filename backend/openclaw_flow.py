"""Sovereignty-first validation gate for actions in OpenClaw Governance."""

from dataclasses import dataclass
import logging
from typing import Any, Optional

logger = logging.getLogger(__name__)

_REQUIRED_GATE_FLAGS = (
    "sovereignty_check",
    "love_quality_validation",
    "human_authority_preserved",
    "extraction_prevention",
)

_POLICY_BOOLEAN_FIELDS = (
    "human_controlled",
    "human_owned",
    "increases_flourishing",
    "reduces_harm",
    "creates_beauty",
    "extracts_human_value",
    "extracts_natural_value",
    "concentrates_power",
)


@dataclass
class FlowAction:
    name: str
    human_controlled: bool = True
    human_owned: bool = True
    increases_flourishing: bool = True
    reduces_harm: bool = True
    creates_beauty: bool = False
    extracts_human_value: bool = False
    extracts_natural_value: bool = False
    concentrates_power: bool = False
    metadata: Optional[dict] = None


class OpenClawFlow:
    """Master sovereignty validation gate for OpenClaw Governance Platform."""

    def __init__(self) -> None:
        # These flags are policy requirements, not optional switches. A mutated
        # or malformed configuration blocks the flow instead of disabling a gate.
        self.sovereignty_check = True
        self.love_quality_validation = True
        self.human_authority_preserved = True
        self.extraction_prevention = True
        logger.info("OpenClaw Flow initialized — sovereignty-first mode active")

    @staticmethod
    def _valid_action(action: Any) -> bool:
        """Require an unambiguous action shape; dataclass annotations are not runtime checks."""
        if not isinstance(action, FlowAction):
            return False
        if not isinstance(action.name, str) or not action.name.strip():
            return False
        if any(type(getattr(action, field, None)) is not bool for field in _POLICY_BOOLEAN_FIELDS):
            return False
        if action.metadata is not None and not isinstance(action.metadata, dict):
            return False
        if isinstance(action.metadata, dict) and any(
            not isinstance(key, str) for key in action.metadata
        ):
            return False
        return True

    def validate_flow(self, action: FlowAction) -> str:
        """Return an explicit block decision unless every policy gate passes."""
        if not self._valid_action(action):
            logger.warning("FLOW_BLOCKED: Invalid or ambiguous action payload")
            return "FLOW_BLOCKED: Invalid action payload"

        if any(getattr(self, flag, None) is not True for flag in _REQUIRED_GATE_FLAGS):
            logger.error("FLOW_BLOCKED: Required policy gate configuration is not enabled")
            return "FLOW_BLOCKED: Required policy gate disabled"

        if not self.preserves_human_sovereignty(action):
            logger.warning("FLOW_BLOCKED: Sovereignty violation — %s", action.name)
            return "FLOW_BLOCKED: Sovereignty violation detected"
        if not self.increases_love_quality(action):
            logger.warning("FLOW_BLOCKED: Love quality insufficient — %s", action.name)
            return "FLOW_BLOCKED: Love quality insufficient"
        if self.enables_extraction(action):
            logger.warning("FLOW_BLOCKED: Extractive pattern — %s", action.name)
            return "FLOW_BLOCKED: Extractive pattern detected"
        logger.info("FLOW_APPROVED: %s", action.name)
        return "FLOW_APPROVED: Sovereignty preserved, love increased"

    def preserves_human_sovereignty(self, action: FlowAction) -> bool:
        return action.human_controlled is True and action.human_owned is True

    def increases_love_quality(self, action: FlowAction) -> bool:
        return (
            action.increases_flourishing is True
            and action.reduces_harm is True
            and action.creates_beauty is True
        )

    def enables_extraction(self, action: FlowAction) -> bool:
        return (
            action.extracts_human_value is True
            or action.extracts_natural_value is True
            or action.concentrates_power is True
        )


# Compatibility singleton retained for existing imports.
flow = OpenClawFlow()
