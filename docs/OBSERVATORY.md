# AEGIS Intelligence Observatory

The Observatory is a static browser companion for the AEGIS Intelligence Observatory project. It uses the checked-in `public/observatory/data.json` dataset, which contains 20 synthetic investigation records plus source summary arrays. It is not connected to production telemetry and is separate from the 1,200-case AEGIS retrieval benchmark.

## Views

- **Executive overview** — filtered KPI cards, outcome distribution, retrieval-mode comparison, and domain coverage.
- **Retrieval analysis** — mode-level duration and evidence comparisons plus the declared source summary.
- **Evidence quality** — evidence and citation distributions with explicit semantic-support boundaries.
- **Performance & reliability** — min/median/max duration, provider distribution, and declared reliability summary.
- **Investigation explorer** — searchable, sortable records with keyboard-accessible detail drawers.

## Data boundaries

Investigation-level charts are derived only from fields present in `investigation_explorer`: status, provider, retrieval mode, duration, evidence count, citation count, and domain. Source summary arrays are displayed as declared, unfiltered measurements because they cannot be reconstructed safely from every row-level field under arbitrary filters.

There is no timestamp field, so the dashboard does not invent a time series. It also does not infer root causes, evidence excerpts, semantic entailment, or overall answer accuracy.

## Local validation

```powershell
node tools/validate_observatory.mjs
node --check public/observatory/app.js
```

Open `/observatory/` through the normal Next.js static export or a local static server. The native report remains available at `/downloads/AEGIS-Intelligence-Observatory.pbix`.
