"""Regression tests for the OpenClaw sovereignty-first action gate."""

import unittest

from backend.openclaw_flow import FlowAction, OpenClawFlow, flow


class OpenClawFlowTests(unittest.TestCase):
    def setUp(self) -> None:
        self.gate = OpenClawFlow()

    def positive_action(self, **overrides) -> FlowAction:
        fields = {
            "name": "community-support",
            "human_controlled": True,
            "human_owned": True,
            "increases_flourishing": True,
            "reduces_harm": True,
            "creates_beauty": True,
            "extracts_human_value": False,
            "extracts_natural_value": False,
            "concentrates_power": False,
        }
        fields.update(overrides)
        return FlowAction(**fields)

    def test_approves_only_a_fully_qualified_non_extractive_action(self) -> None:
        result = self.gate.validate_flow(self.positive_action())
        self.assertEqual(
            result,
            "FLOW_APPROVED: Sovereignty preserved, love increased",
        )

    def test_requires_human_control_and_ownership(self) -> None:
        for field in ("human_controlled", "human_owned"):
            with self.subTest(field=field):
                result = self.gate.validate_flow(self.positive_action(**{field: False}))
                self.assertEqual(
                    result,
                    "FLOW_BLOCKED: Sovereignty violation detected",
                )

    def test_requires_all_three_love_quality_conditions(self) -> None:
        for field in ("increases_flourishing", "reduces_harm", "creates_beauty"):
            with self.subTest(field=field):
                result = self.gate.validate_flow(self.positive_action(**{field: False}))
                self.assertEqual(
                    result,
                    "FLOW_BLOCKED: Love quality insufficient",
                )

    def test_blocks_each_extractive_pattern(self) -> None:
        for field in (
            "extracts_human_value",
            "extracts_natural_value",
            "concentrates_power",
        ):
            with self.subTest(field=field):
                result = self.gate.validate_flow(self.positive_action(**{field: True}))
                self.assertEqual(result, "FLOW_BLOCKED: Extractive pattern detected")

    def test_rejects_truthy_non_boolean_policy_fields(self) -> None:
        boolean_fields = (
            "human_controlled",
            "human_owned",
            "increases_flourishing",
            "reduces_harm",
            "creates_beauty",
            "extracts_human_value",
            "extracts_natural_value",
            "concentrates_power",
        )
        for field in boolean_fields:
            for invalid in ("false", 0, 1, None):
                with self.subTest(field=field, invalid=invalid):
                    result = self.gate.validate_flow(
                        self.positive_action(**{field: invalid})
                    )
                    self.assertEqual(result, "FLOW_BLOCKED: Invalid action payload")

    def test_rejects_invalid_action_shapes(self) -> None:
        for action in (None, {}, "approved", 123):
            with self.subTest(action=action):
                self.assertEqual(
                    self.gate.validate_flow(action),
                    "FLOW_BLOCKED: Invalid action payload",
                )

        self.assertEqual(
            self.gate.validate_flow(self.positive_action(name="   ")),
            "FLOW_BLOCKED: Invalid action payload",
        )
        self.assertEqual(
            self.gate.validate_flow(self.positive_action(metadata=[])),
            "FLOW_BLOCKED: Invalid action payload",
        )

    def test_required_policy_gate_flags_cannot_be_disabled(self) -> None:
        required_flags = (
            "sovereignty_check",
            "love_quality_validation",
            "human_authority_preserved",
            "extraction_prevention",
        )
        for flag in required_flags:
            for invalid in (False, "true", None):
                with self.subTest(flag=flag, invalid=invalid):
                    gate = OpenClawFlow()
                    setattr(gate, flag, invalid)
                    self.assertEqual(
                        gate.validate_flow(self.positive_action()),
                        "FLOW_BLOCKED: Required policy gate disabled",
                    )

    def test_metadata_object_keys_must_be_strings(self) -> None:
        self.assertEqual(
            self.gate.validate_flow(self.positive_action(metadata={1: "ambiguous"})),
            "FLOW_BLOCKED: Invalid action payload",
        )

    def test_module_level_singleton_is_available(self) -> None:
        self.assertIsInstance(flow, OpenClawFlow)


if __name__ == "__main__":
    unittest.main()
