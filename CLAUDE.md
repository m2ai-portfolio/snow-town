# CLAUDE.md - Snow-Town

## Quick Commands

```bash
source .venv/bin/activate
pip install -e ".[dev]"
pytest tests/
```

## Project Purpose

Snow-Town is the orchestration layer that closes the feedback loop between:
1. **Ultra Magnus** - Idea pipeline (produces OutcomeRecords)
2. **Sky-Lynx** - Observer (analyzes outcomes, produces ImprovementRecommendations)
3. **Agent Persona Academy** - Factory (consumes recommendations, produces PersonaUpgradePatches)

## Architecture

```
contracts/              # Pydantic models defining inter-layer data contracts
  outcome_record.py     # UM -> SL
  improvement_recommendation.py  # SL -> Academy
  persona_upgrade_patch.py       # Academy -> UM
  store.py              # Dual-write JSONL + SQLite store
schemas/                # JSON Schema exports for TypeScript consumers
data/                   # JSONL data files (append-only, git-tracked)
scripts/                # Orchestration and automation
tests/                  # Contract tests
```

## Key Decisions

- **JSONL as source of truth** - append-only, git-tracked, human-readable
- **SQLite as query layer** - rebuildable from JSONL at any time
- **Contracts defined here, imported by layers** - single source of truth for schemas
- **Weekly cadence** - matches Sky-Lynx's existing cron schedule

## Data Flow

```
UM terminal state -> OutcomeRecord -> JSONL
Sky-Lynx reads JSONL -> analyzes -> ImprovementRecommendation -> JSONL
persona_upgrader reads JSONL -> generates patch -> PersonaUpgradePatch -> JSONL
```
