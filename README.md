# Oneidy Constanza-Garcia | Engineering Portfolio

**AI Application & Automation Engineer**

This portfolio presents verified engineering work across AI applications, Python services, REST APIs, SQL, automation, data workflows, testing, and cloud-connected deployments.

**[View the live portfolio](https://itsmyfacade.github.io/)**

## Featured projects

### AEGIS: Evidence-Grounded Intelligence System

An evidence-grounded AI investigation application built with Python, FastAPI, LangGraph, LangChain, SQLite, retrieval workflows, structured synthesis, and citation verification. The portfolio includes authentic application and CI evidence.

### AEGIS Intelligence Observatory

A deterministic Python ETL and analytics companion using SQLite, SQL validation, CSV exports, a native Power BI report, and a static browser dashboard. Observatory records are synthetic AEGIS-compatible demonstration data and do not represent production telemetry.

- [Interactive browser companion](https://itsmyfacade.github.io/observatory/)
- [Download the Power BI report](https://itsmyfacade.github.io/downloads/AEGIS-Intelligence-Observatory.pbix)

The browser dashboard is separate from the native Power BI report and is not a Power BI embed. It provides five local views—Executive Overview, Retrieval Analysis, Evidence Quality, Performance & Reliability, and Investigation Explorer—derived from 20 synthetic investigation records. It does not represent live production telemetry or the separate 1,200-case retrieval benchmark. See [Observatory notes](docs/OBSERVATORY.md) for data boundaries.

### Sentiment Lab

A full-stack NLP application using real DistilBERT inference through a Flask API and Next.js interface. It supports positive and negative classification, confidence scores, single and batch analysis, session history, and CSV export.

- [Live demo](https://sentiment-lab-web.onrender.com)
- [Source repository](https://github.com/itsmyfacade/sentiment-app)

### Semantic Discovery

An embedding-based search application using MiniLM, normalized 384-dimensional vectors, cosine similarity, and an 80-record synthetic demonstration catalog. It supports semantic search, query comparison, catalog filtering, and CSV export.

- [Live demo](https://semantic-discovery-web.onrender.com)
- [Source repository](https://github.com/itsmyfacade/recommender-app)

## Technology stack

**AI and backend:** Python, Flask, FastAPI, LangGraph, LangChain, DistilBERT, Sentence Transformers, REST APIs.

**Data and analytics:** SQL, SQLite, Python ETL, validation, Power BI, structured data workflows.

**Web development:** Next.js, React, TypeScript, JavaScript, HTML, CSS.

**Quality and delivery:** Pytest, Ruff, Pyright, GitHub Actions, CI/CD, Docker, Render, GitHub Pages.

## Local development

```bash
npm ci
npm run dev
```

Useful validation commands:

```bash
npm run typecheck
npm run lint
npm run build
npm audit --audit-level=high
```

The site uses Next.js static export for GitHub Pages. The deployment workflow runs the validation commands, publishes the generated `out/` directory, and deploys through GitHub Pages. The portfolio itself is not Dockerized. Private source-asset handling and the limits of browser-delivered media are documented in [Private asset workflow](docs/PRIVATE_ASSET_WORKFLOW.md); no private asset credentials are shipped to the client.

## Evidence and accessibility

Project case studies use authentic screenshots with descriptive captions. Images open in the existing accessible lightbox with keyboard controls, focus restoration, responsive sizing, and reduced-motion support. The site uses semantic sections, visible focus states, responsive layouts, and accessible navigation.

## Resume and contact

- [Download resume PDF](https://itsmyfacade.github.io/resume/Oneidy_Constanza_Garcia_AI_Engineer.pdf)
- [LinkedIn](https://linkedin.com/in/oneidy)
- [Email](mailto:oneidyconstanzagarcia@gmail.com)

Open to remote engineering opportunities.
