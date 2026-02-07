"""Tests for ImprovementRecommendation contract."""

import pytest

from contracts.improvement_recommendation import (
    EvidenceBasis,
    ImprovementRecommendation,
    RecommendationType,
    TargetScope,
)


class TestImprovementRecommendation:
    """Schema validation and roundtrip tests."""

    def test_minimal_valid_recommendation(self):
        rec = ImprovementRecommendation(
            recommendation_id="rec-001",
            recommendation_type=RecommendationType.VOICE_ADJUSTMENT,
            title="Adjust voice tone",
            description="Make tone more concise",
            suggested_change="Remove verbose phrasing",
        )
        assert rec.contract_version == "1.0.0"
        assert rec.priority == "medium"
        assert rec.scope == TargetScope.ALL_PERSONAS
        assert rec.status == "pending"

    def test_full_recommendation(self):
        rec = ImprovementRecommendation(
            recommendation_id="rec-002",
            session_id="session-abc",
            recommendation_type=RecommendationType.FRAMEWORK_ADDITION,
            target_system="persona",
            title="Add cost analysis framework",
            description="Personas lack cost analysis capability",
            suggested_change="Add FinOps framework to Carmack persona",
            scope=TargetScope.SPECIFIC_PERSONA,
            target_persona_ids=["carmack"],
            priority="high",
            impact="Better cost recommendations",
            reversibility="high",
            evidence=EvidenceBasis(
                outcome_record_ids=[1, 2, 3],
                pattern_frequency=3,
                signal_strength=0.8,
                description="3 ideas failed due to cost overruns",
            ),
        )
        assert rec.target_system == "persona"
        assert len(rec.target_persona_ids) == 1
        assert rec.evidence.pattern_frequency == 3

    def test_roundtrip_serialization(self):
        rec = ImprovementRecommendation(
            recommendation_id="rec-003",
            recommendation_type=RecommendationType.CLAUDE_MD_UPDATE,
            title="Update testing section",
            description="Add integration test guidelines",
            suggested_change="Add section to CLAUDE.md",
            target_system="claude_md",
        )
        json_str = rec.model_dump_json()
        restored = ImprovementRecommendation.model_validate_json(json_str)
        assert restored.recommendation_id == rec.recommendation_id
        assert restored.recommendation_type == rec.recommendation_type

    def test_specific_scope_requires_target_ids(self):
        with pytest.raises(ValueError, match="target_persona_ids must be non-empty"):
            ImprovementRecommendation(
                recommendation_id="rec-004",
                recommendation_type=RecommendationType.VOICE_ADJUSTMENT,
                title="Adjust voice",
                description="...",
                suggested_change="...",
                scope=TargetScope.SPECIFIC_PERSONA,
                target_persona_ids=[],
            )

    def test_evidence_pattern_frequency_minimum(self):
        with pytest.raises(ValueError):
            EvidenceBasis(pattern_frequency=0)

    def test_evidence_signal_strength_bounds(self):
        EvidenceBasis(signal_strength=0.0)
        EvidenceBasis(signal_strength=1.0)
        with pytest.raises(ValueError):
            EvidenceBasis(signal_strength=1.5)
        with pytest.raises(ValueError):
            EvidenceBasis(signal_strength=-0.1)

    def test_all_recommendation_types(self):
        for rtype in RecommendationType:
            rec = ImprovementRecommendation(
                recommendation_id=f"rec-{rtype.value}",
                recommendation_type=rtype,
                title=f"Test {rtype.value}",
                description="Test",
                suggested_change="Test",
            )
            assert rec.recommendation_type == rtype
