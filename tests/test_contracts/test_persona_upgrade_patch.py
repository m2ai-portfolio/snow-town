"""Tests for PersonaUpgradePatch contract."""

import pytest

from contracts.persona_upgrade_patch import (
    PatchOperation,
    PersonaFieldPatch,
    PersonaUpgradePatch,
)


class TestPersonaFieldPatch:
    """Field-level patch tests."""

    def test_add_patch(self):
        patch = PersonaFieldPatch(
            operation=PatchOperation.ADD,
            path="/voice/phrases/-",
            value="New phrase",
        )
        assert patch.operation == PatchOperation.ADD
        assert patch.value == "New phrase"

    def test_replace_patch(self):
        patch = PersonaFieldPatch(
            operation=PatchOperation.REPLACE,
            path="/voice/tone/0",
            value="more concise",
        )
        assert patch.operation == PatchOperation.REPLACE

    def test_remove_patch(self):
        patch = PersonaFieldPatch(
            operation=PatchOperation.REMOVE,
            path="/voice/constraints/2",
        )
        assert patch.operation == PatchOperation.REMOVE

    def test_add_requires_value(self):
        with pytest.raises(ValueError, match="add operation requires a value"):
            PersonaFieldPatch(
                operation=PatchOperation.ADD,
                path="/voice/phrases/-",
                value=None,
            )

    def test_replace_requires_value(self):
        with pytest.raises(ValueError, match="replace operation requires a value"):
            PersonaFieldPatch(
                operation=PatchOperation.REPLACE,
                path="/voice/tone/0",
                value=None,
            )


class TestPersonaUpgradePatch:
    """Patch-level tests."""

    def test_minimal_valid_patch(self):
        patch = PersonaUpgradePatch(
            patch_id="patch-001",
            persona_id="christensen",
            patches=[
                PersonaFieldPatch(
                    operation=PatchOperation.ADD,
                    path="/voice/phrases/-",
                    value="Consider the data",
                ),
            ],
            rationale="Strengthen data-driven language",
        )
        assert patch.contract_version == "1.0.0"
        assert patch.status == "proposed"
        assert len(patch.patches) == 1

    def test_empty_patches_rejected(self):
        with pytest.raises(ValueError):
            PersonaUpgradePatch(
                patch_id="patch-002",
                persona_id="christensen",
                patches=[],
                rationale="No changes",
            )

    def test_roundtrip_serialization(self):
        patch = PersonaUpgradePatch(
            patch_id="patch-003",
            persona_id="sky-lynx",
            patches=[
                PersonaFieldPatch(
                    operation=PatchOperation.REPLACE,
                    path="/voice/tone/0",
                    value="more analytical",
                ),
                PersonaFieldPatch(
                    operation=PatchOperation.ADD,
                    path="/frameworks/cost_analysis",
                    value={"description": "Analyze costs", "concepts": {}},
                ),
            ],
            rationale="Improve analytical depth",
            source_recommendation_ids=["rec-001", "rec-002"],
            from_version="1.0.0",
            to_version="1.1.0",
        )
        json_str = patch.model_dump_json()
        restored = PersonaUpgradePatch.model_validate_json(json_str)
        assert restored.patch_id == patch.patch_id
        assert len(restored.patches) == 2
        assert restored.source_recommendation_ids == ["rec-001", "rec-002"]

    def test_all_statuses(self):
        for status in ["proposed", "applied", "rejected"]:
            patch = PersonaUpgradePatch(
                patch_id=f"patch-{status}",
                persona_id="test",
                patches=[
                    PersonaFieldPatch(
                        operation=PatchOperation.ADD,
                        path="/test",
                        value="test",
                    ),
                ],
                rationale="test",
                status=status,
            )
            assert patch.status == status
