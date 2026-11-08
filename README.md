# Oneidy Constanza-Garcia | Engineering Portfolio

The professional portfolio of Oneidy Constanza-Garcia, an AI Application & Automation Engineer focused on Python, backend systems, REST APIs, SQL, automation, applied AI, and application integrations.

This site presents verified engineering work, technical decisions, validation evidence, and honest project limitations for recruiters and engineering interviewers.

Visit the portfolio at [itsmyfacade.github.io](https://itsmyfacade.github.io/).

## Featured work

### AEGIS

An evidence-grounded incident investigation application built with FastAPI, LangGraph, SQLite, retrieval, provider abstractions, evidence validation, and automated QA. The case study includes real application screenshots and GitHub Actions evidence.

### AEGIS Intelligence Observatory

A deterministic analytics companion built with Python ETL, SQLite/SQL, validated synthetic records, CSV exports, and Power BI reporting. The portfolio includes the supplied Power BI report, report-page evidence, and a static interactive browser companion.

The Observatory data is synthetic AEGIS-compatible demonstration data. It must not be interpreted as production telemetry or a production performance benchmark.

The browser dashboard at [itsmyfacade.github.io/observatory](https://itsmyfacade.github.io/observatory/) is a static client-side companion powered by `data.json`; it is not a native Power BI embed and does not claim filtering controls. The native report is available as [AEGIS-Intelligence-Observatory.pbix](https://itsmyfacade.github.io/downloads/AEGIS-Intelligence-Observatory.pbix).

## Technology

Next.js, React, TypeScript, Python, FastAPI, LangGraph, SQLite, SQL, retrieval systems, Power BI, JavaScript, GitHub Actions, Pytest, Playwright, Ruff, and Pyright are represented across the featured projects. This portfolio itself uses Next.js static export, TypeScript, Biome, and lightweight CSS/React animation.

## Local development

Requirements: Node.js and npm.

```bash
git clone https://github.com/itsmyfacade/itsmyfacade.github.io.git
cd itsmyfacade.github.io
npm ci
npm run dev
```

Open `http://localhost:3000`.

Available checks:

```bash
npm run typecheck
npm run lint
npm run build
npm audit --audit-level=high
```

The Observatory companion can be checked independently with:

```bash
node --check public/observatory/app.js
```

## Static export and GitHub Pages

`next.config.ts` uses `output: "export"` and generates the static site in `out/`. The repository includes `.github/workflows/deploy-pages.yml`, which runs type checking, linting, and the production build before publishing `out/` through GitHub Pages.

The intended root-domain repository is `itsmyfacade.github.io`. No deployment is performed by local commands; publishing requires pushing the reviewed repository to GitHub and enabling GitHub Pages with GitHub Actions.

## Repository structure

```text
app/                       Next.js page, metadata, styles, favicon
components/                Reusable reveal animation
content/                   Typed profile, project, skills, and approach content
public/observatory/        Static synthetic-data browser companion
public/project-media/      Verified project screenshots and report renders
public/downloads/          Power BI report download
public/resume/             Verified resume PDF
.github/workflows/         GitHub Pages deployment workflow
```

## Resume and contact

Verified resume: [Download the resume](https://itsmyfacade.github.io/resume/Oneidy_Constanza_Garcia_AI_Engineer.pdf)

- GitHub: [github.com/itsmyfacade](https://github.com/itsmyfacade)
- LinkedIn: [linkedin.com/in/oneidy](https://linkedin.com/in/oneidy)
- Email: [oneidyconstanzagarcia@gmail.com](mailto:oneidyconstanzagarcia@gmail.com)

Oneidy is open to remote engineering opportunities.

## Content boundaries

The portfolio does not invent employers, dates, degrees, certifications, awards, production metrics, or deployment claims. AEGIS and the Observatory remain separate reference projects and are not modified by this portfolio repository.
