"""PersonaUpgradePatch contract: Academy -> Ultra Magnus.

Minimal diff describing what changed in a persona.
"""

from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field, model_validator


class PatchOperation(str, Enum):
    """JSON Patch-style operations."""
    ADD = "add"
    REPLACE = "replace"
    REMOVE = "remove"


class PersonaFieldPatch(BaseModel):
    """A single field-level change to a persona."""
    operation: PatchOperation
    path: str  # JSON Pointer path, e.g. "/voice/phrases/-"
    value: str | list | dict | None = None

    @model_validator(mode="after")
    def validate_value_for_operation(self) -> "PersonaFieldPatch":
        """Add/replace operations require a value; remove does not."""
        if self.operation in (PatchOperation.ADD, PatchOperation.REPLACE) and self.value is None:
            raise ValueError(f"{self.operation.value} operation requires a value")
        return self


class PersonaUpgradePatch(BaseModel):
    """Patch describing changes to a persona definition.

    Precondition: persona_id references existing persona; patches non-empty.
    Postcondition: applying patch to valid persona yields valid persona.
    """
    contract_version: str = "1.0.0"
    patch_id: str
    persona_id: str
    patches: list[PersonaFieldPatch] = Field(min_length=1)
    rationale: str
    source_recommendation_ids: list[str] = Field(default_factory=list)
    from_version: str = "0.0.0"
    to_version: str = "0.1.0"
    schema_valid: bool = True
    status: str = "proposed"  # proposed | applied | rejected
    emitted_at: datetime = Field(default_factory=datetime.now)
