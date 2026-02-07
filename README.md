# Snow-Town

Closed-loop learning ecosystem connecting three projects into a feedback triangle:

- **Ultra Magnus** (idea pipeline) produces outcome data
- **Sky-Lynx** (observer) analyzes outcomes into improvement recommendations
- **Agent Persona Academy** (factory) consumes recommendations to upgrade personas

Upgraded personas feed back into Ultra Magnus for the next cycle.

## Architecture

```
Ultra Magnus ──OutcomeRecord──> Sky-Lynx
     ^                              │
     │                    ImprovementRecommendation
PersonaUpgradePatch                 │
     │                              v
     └──────────── Agent Persona Academy
```

## Contracts

| Contract | From | To | Purpose |
|----------|------|----|---------|
| `OutcomeRecord` | Ultra Magnus | Sky-Lynx | Idea pipeline outcomes |
| `ImprovementRecommendation` | Sky-Lynx | Academy | Typed improvement proposals |
| `PersonaUpgradePatch` | Academy | Ultra Magnus | Persona YAML diffs |

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

## Tests

```bash
pytest tests/
```

## Data Files

All data is stored in `data/` as append-only JSONL files (git-tracked):
- `outcome_records.jsonl`
- `improvement_recommendations.jsonl`
- `persona_patches.jsonl`

SQLite (`data/persona_metrics.db`) serves as a query layer, rebuildable from JSONL.

## Scripts

- `scripts/persona_upgrader.py` - Generate persona patches from recommendations
- `scripts/loop_status.py` - Report feedback loop status
- `scripts/run_loop.sh` - Orchestrate the full feedback cycle
