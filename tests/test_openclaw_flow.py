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

    def test_module_level_singleton_is_available(self) -> None:
        self.assertIsInstance(flow, OpenClawFlow)


if __name__ == "__main__":
    unittest.main()
