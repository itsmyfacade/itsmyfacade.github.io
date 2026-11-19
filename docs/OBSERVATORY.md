# AEGIS Intelligence Observatory

The Observatory is the data-engineering and analytics case study at [`/#observatory`](https://itsmyfacade.github.io/#observatory). It documents a deterministic Python ETL pipeline that generates synthetic AEGIS-compatible records, validates a normalized SQLite model, and exports portable CSV reporting data for a user-authored Microsoft Power BI report.

## Canonical presentation

The portfolio case study is the single Observatory destination. It preserves five screenshots from the original Power BI report, an accessible lightbox with image navigation and zoom, and the downloadable native report at `/downloads/AEGIS-Intelligence-Observatory.pbix`.

The legacy `/observatory/` path remains as a static GitHub Pages-compatible redirect to `/#observatory`. It is not a second dashboard and does not load a browser analytics application.

## Data boundaries

The records and report use synthetic demonstration data. They are not connected to Power BI Service, production telemetry, or the separate 1,200-case AEGIS retrieval benchmark. The screenshot gallery is a static presentation of the report, not native Power BI interactivity.

The Python pipeline, SQLite checks, CSV exports, report handoff, and Power BI artifact remain separate concerns. The PBIX is a portfolio artifact whose Desktop rendering was not independently revalidated in this environment.

## Local validation

```powershell
npm run typecheck
npm run lint
npm run build
```

The static export preserves the legacy redirect at `/observatory/` and the canonical case study at `/#observatory`.
