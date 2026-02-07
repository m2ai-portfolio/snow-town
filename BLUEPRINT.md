# Snow-Town Blueprint

## Phase Tracking

### Phase 0: Cleanup Dead Code
- [x] Delete `idea-factory/` directory
- [x] Delete `idea-factory-dashboard/` directory
- [x] Delete `processor.py`
- [x] Verify UM MCP server still starts

### Phase 1: Snow-Town Umbrella Repo + Shared Contracts
- [x] Create directory structure
- [x] Define OutcomeRecord contract
- [x] Define ImprovementRecommendation contract
- [x] Define PersonaUpgradePatch contract
- [x] Implement ContractStore (JSONL + SQLite)
- [x] Generate JSON schemas
- [x] Write contract tests
- [x] Create project files (README, CLAUDE.md, pyproject.toml)

### Phase 2: Outcome Recording in Ultra Magnus
- [ ] Add `_emit_outcome_record()` to repository.py
- [ ] Add `um_record_outcome` tool to server.py
- [ ] Test with idea pipeline

### Phase 3: Structured Recommendations in Sky-Lynx
- [ ] Create `outcome_reader.py`
- [ ] Extend `claude_client.py` with outcome data section
- [ ] Add JSON sidecar to `report_writer.py`
- [ ] Wire outcome reader in `analyzer.py`

### Phase 4: Persona Upgrade Engine
- [ ] Create `persona_upgrader.py`
- [ ] Implement Claude API patch generation
- [ ] Add schema validation
- [ ] Add --dry-run, --auto-apply, --persona flags

### Phase 5: Loop Orchestration
- [ ] Create `run_loop.sh`
- [ ] Create `loop_status.py`
- [ ] Update cron configuration

### Phase 6: Full Rename (Deferred)
- [ ] Present rename map for approval
- [ ] Execute renames

### Phase 7: Visualization (Deferred)
- [ ] Design dashboard
- [ ] Implement React app
