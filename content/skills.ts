export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { label: "Programming & software engineering", items: ["Python", "C#", "JavaScript", "TypeScript", "SQL", "PowerShell", "Bash", "Object-oriented programming", "Software architecture", "Debugging and troubleshooting"] },
  { label: "Frontend & full-stack engineering", items: ["React", "Next.js", "HTML", "CSS", "Node.js", "Component-based applications", "Responsive interfaces", "API-connected frontends"] },
  { label: "Backend & API engineering", items: ["FastAPI", "Pydantic", "REST APIs", "JSON", "SDK integrations", "Authentication and authorization", "Database integration", "Data validation", "Error handling", "API troubleshooting"] },
  { label: "AI applications & LLM engineering", items: ["LLM integrations", "RAG", "LangGraph", "LangChain", "AWS Bedrock", "Amazon Nova Micro", "Prompt engineering", "Structured outputs", "Evidence grounding", "Retrieval evaluation", "Semantic search", "Embeddings", "ChromaDB", "Sentence Transformers"] },
  { label: "Databases, data engineering & analytics", items: ["PostgreSQL", "SQLite", "Supabase", "Python ETL", "Data validation", "Metadata management", "Power BI", "Analytics and reporting", "Structured data workflows"] },
  { label: "Cloud & infrastructure", items: ["AWS Bedrock", "Microsoft Azure", "Azure Blob Storage", "Docker", "Render", "GitHub Pages", "Cloud storage configuration", "Storage access controls", "Regional storage considerations", "Recoverability planning"] },
  { label: "Automation, testing & developer operations", items: ["Git", "GitHub", "GitHub Actions", "CI/CD", "Pytest", "Ruff", "Pyright", "Automated regression testing", "Static analysis", "Type checking", "Build validation", "Technical documentation"] },
  { label: "Security & engineering practices", items: ["API authentication", "Authorization", "Access controls", "Secure file handling", "Data integrity", "Root-cause analysis", "Evidence validation", "Reliability-focused engineering"] },
];
