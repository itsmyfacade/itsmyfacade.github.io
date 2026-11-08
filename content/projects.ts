export type Project = {
  slug: string;
  number: string;
  title: string;
  discipline: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  decisions: string[];
  validation: string[];
  outcomes: string[];
  limitations: string[];
  accent: "cyan" | "violet";
};

export const projects: Project[] = [
  {
    slug: "aegis",
    number: "01",
    title: "AEGIS",
    discipline: "AI application engineering",
    summary: "An evidence-grounded incident investigation system that correlates technical documentation with read-only operational evidence.",
    problem: "Incident answers become difficult to trust when observations, documented causes, hypotheses, and conclusions are flattened into one unsupported response.",
    solution: "A bounded FastAPI and LangGraph workflow retrieves evidence, queries operational SQLite records, synthesizes a report, and verifies evidence references before returning it.",
    architecture: ["FastAPI", "LangGraph", "SQLite", "Hosted-lite lexical retrieval", "Optional Chroma vector path"],
    decisions: ["Keep evaluator labels outside serving data.", "Make SQL investigation read-only and parameterized.", "Use deterministic local synthesis for the hosted demo.", "Expose uncertainty and evidence gaps instead of overstating certainty."],
    validation: ["Pytest", "HTTPX API contracts", "Playwright Chromium coverage", "Ruff and Pyright", "Hosted-lite smoke checks"],
    outcomes: ["A reproducible local incident-investigation demo.", "Five-stage bounded workflow with evidence verification.", "30 narrative documents and 20 synthetic scenarios."],
    limitations: ["Synthetic data is not production telemetry.", "Hosted-lite uses lexical retrieval.", "Standard semantic retrieval remains optional and security-blocked by unresolved Chroma advisories."],
    accent: "cyan",
  },
  {
    slug: "observatory",
    number: "02",
    title: "AEGIS Intelligence Observatory",
    discipline: "Data engineering / analytics",
    summary: "A deterministic analytics companion that turns an AEGIS-compatible contract into validated SQLite and Power BI-ready reporting data.",
    problem: "A project is easier to reason about when its data contract, quality checks, operational measures, and reporting handoff are explicit.",
    solution: "A standard-library Python pipeline generates synthetic records, loads a normalized SQLite model, validates constraints and metrics, and exports portable CSVs plus a local dashboard preview.",
    architecture: ["Deterministic generator", "Validated ETL", "SQLite", "CSV exports", "Power BI handoff", "Local dashboard preview"],
    decisions: ["Label all records as synthetic demonstration data.", "Keep Power BI artifacts portable through CSV exports.", "Use metric definitions with explicit denominators.", "Reject orphaned keys and invalid operational states."],
    validation: ["Six pytest regression tests", "SQLite foreign-key checks", "Idempotent rebuild comparison", "Dashboard JavaScript syntax check"],
    outcomes: ["20 scenarios and investigations.", "80 retrieval events, 90 evidence records, and 100 stage records.", "A user-authored Power BI report with four analysis pages and investigation drill-through."],
    limitations: ["The PBIX is a local portfolio artifact; its Desktop rendering was not independently revalidated in this environment.", "Metrics are synthetic and do not represent AEGIS production performance.", "The Power BI report remains separate from the reproducible Python pipeline."],
    accent: "violet",
  },
];
