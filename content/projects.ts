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
  links?: { label: string; href: string; external?: boolean }[];
  accent: "cyan" | "violet";
};

export const projects: Project[] = [
  {
    slug: "aegis",
    number: "01",
    title: "AEGIS",
    discipline: "AI application engineering",
    summary:
      "An evidence-grounded incident investigation system that correlates technical documentation with read-only operational evidence.",
    problem:
      "Incident answers become difficult to trust when observations, documented causes, hypotheses, and conclusions are flattened into one unsupported response.",
    solution:
      "A bounded FastAPI and LangGraph workflow combines LangChain retrieval abstractions, read-only SQL analysis, structured synthesis, and evidence verification. It supports an AWS Bedrock/Amazon Nova Micro provider path while keeping the public hosted demonstration deterministic and local.",
    architecture: [
      "FastAPI",
      "LangGraph",
      "LangChain",
      "SQLite",
      "Hosted-lite lexical retrieval",
      "Optional Chroma semantic retrieval",
      "AWS Bedrock / Amazon Nova Micro",
      "Docker and GitHub Actions",
    ],
    decisions: [
      "Keep evaluator labels outside serving data.",
      "Make SQL investigation read-only and parameterized.",
      "Use deterministic local synthesis for the hosted demo.",
      "Keep Bedrock provider selection explicit; never silently fall back from a failed external request.",
      "Expose uncertainty and evidence gaps instead of overstating certainty.",
    ],
    validation: [
      "Pytest",
      "HTTPX API contracts",
      "Playwright Chromium coverage",
      "Ruff and Pyright",
      "Hosted-lite smoke checks",
    ],
    outcomes: [
      "A reproducible local incident-investigation demo.",
      "Five-stage bounded workflow with evidence verification.",
      "30 narrative documents and 20 synthetic scenarios.",
    ],
    limitations: [
      "Synthetic data is not production telemetry.",
      "Hosted-lite uses lexical retrieval and deterministic local synthesis; it does not actively invoke Bedrock.",
      "Standard semantic retrieval remains optional and security-blocked by unresolved Chroma advisories.",
    ],
    accent: "cyan",
  },
  {
    slug: "observatory",
    number: "02",
    title: "AEGIS Intelligence Observatory",
    discipline: "Data engineering / analytics",
    summary:
      "A deterministic analytics companion that turns an AEGIS-compatible contract into validated SQLite and Power BI-ready reporting data.",
    problem:
      "A project is easier to reason about when its data contract, quality checks, operational measures, and reporting handoff are explicit.",
    solution:
      "A standard-library Python pipeline generates synthetic records, loads a normalized SQLite model, validates constraints and metrics, and exports portable CSVs plus a local dashboard preview.",
    architecture: [
      "Deterministic generator",
      "Validated ETL",
      "SQLite",
      "CSV exports",
      "Power BI handoff",
      "Local dashboard preview",
    ],
    decisions: [
      "Label all records as synthetic demonstration data.",
      "Keep Power BI artifacts portable through CSV exports.",
      "Use metric definitions with explicit denominators.",
      "Reject orphaned keys and invalid operational states.",
    ],
    validation: [
      "Six pytest regression tests",
      "SQLite foreign-key checks",
      "Idempotent rebuild comparison",
      "Dashboard JavaScript syntax check",
    ],
    outcomes: [
      "20 scenarios and investigations.",
      "80 retrieval events, 90 evidence records, and 100 stage records.",
      "A user-authored Power BI report with four analysis pages and investigation drill-through.",
    ],
    limitations: [
      "The PBIX is a local portfolio artifact; its Desktop rendering was not independently revalidated in this environment.",
      "Metrics are synthetic and do not represent AEGIS production performance.",
      "The Power BI report remains separate from the reproducible Python pipeline.",
    ],
    accent: "violet",
  },
  {
    slug: "sentiment-lab",
    number: "03",
    title: "Sentiment Lab",
    discipline: "Machine learning application",
    summary:
      "A full-stack natural language processing workbench that uses a real DistilBERT transformer for positive and negative sentiment classification.",
    problem:
      "Transformer inference is more useful as an engineering project when the model, API contract, frontend workflow, and operational limits are visible together.",
    solution:
      "A Next.js interface sends validated text through a server-side proxy to a Flask inference API. The application presents real labels, confidence scores, timing, bounded batch analysis, session history, and CSV export.",
    architecture: [
      "Next.js and TypeScript",
      "Flask REST API",
      "DistilBERT SST-2",
      "PyTorch",
      "Hugging Face Transformers",
      "Docker and Render",
      "GitHub Actions",
    ],
    decisions: [
      "Keep the model's binary POSITIVE and NEGATIVE output explicit.",
      "Use a server-side API proxy so backend configuration stays out of the browser bundle.",
      "Bound text length and batch size for a controlled public demonstration.",
      "Return safe errors without exposing backend internals.",
    ],
    validation: [
      "Pytest API contracts",
      "Real DistilBERT inference",
      "TypeScript validation",
      "Next.js production build",
      "GitHub Actions CI",
    ],
    outcomes: [
      "Single and batch sentiment analysis with real transformer inference.",
      "Confidence and inference-time reporting from actual responses.",
      "Public Render deployment with separate frontend and API services.",
    ],
    limitations: [
      "The model exposes binary sentiment labels and is not a general emotion classifier.",
      "Render Free cold starts can be slow and public demonstrations have bounded resources.",
      "Session history is client-side and is not a persistent user record.",
    ],
    links: [
      { label: "Live demo", href: "https://sentiment-lab-web.onrender.com", external: true },
      { label: "Source", href: "https://github.com/itsmyfacade/sentiment-app", external: true },
    ],
    accent: "cyan",
  },
  {
    slug: "semantic-discovery",
    number: "04",
    title: "Semantic Discovery",
    discipline: "Semantic retrieval application",
    summary:
      "An embedding-based product discovery application that ranks synthetic catalog records by meaning with MiniLM and cosine similarity.",
    problem:
      "Keyword matching can miss useful results when a user's query and a product description use different words for a related idea.",
    solution:
      "A Next.js workbench sends natural-language queries through a Flask API. Sentence Transformers generates normalized 384-dimensional MiniLM embeddings, then cosine similarity produces ranked results for search and query comparison.",
    architecture: [
      "Next.js and TypeScript",
      "Flask REST API",
      "Sentence Transformers",
      "all-MiniLM-L6-v2",
      "Normalized embeddings",
      "Cosine similarity",
      "Docker and Render",
      "GitHub Actions",
    ],
    decisions: [
      "Use one source-of-truth catalog for the API, embeddings, and explorer.",
      "Cache the catalog embedding matrix rather than rebuilding it per request.",
      "Label the 80 records as synthetic demonstration data.",
      "Keep similarity scores as ranking signals, not purchase probabilities.",
    ],
    validation: [
      "Pytest API and ranking contracts",
      "Real MiniLM inference",
      "80-record catalog checks",
      "TypeScript validation",
      "GitHub Actions CI",
    ],
    outcomes: [
      "Semantic search, query comparison, catalog filtering, and CSV export.",
      "Eight synthetic categories with stable identifiers and searchable attributes.",
      "Measured synthetic evaluation with Recall@5 of 0.6833 and MRR of 1.0000.",
    ],
    limitations: [
      "Evaluation uses five representative queries over a synthetic catalog.",
      "Results are not personalized and do not represent commercial inventory.",
      "Render Free cold starts and memory limits affect public demonstrations.",
    ],
    links: [
      { label: "Live demo", href: "https://semantic-discovery-web.onrender.com", external: true },
      { label: "Source", href: "https://github.com/itsmyfacade/recommender-app", external: true },
    ],
    accent: "violet",
  },
];
