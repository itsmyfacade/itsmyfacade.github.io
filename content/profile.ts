export type OptionalLink = { label: string; href: string };

export type Profile = {
  name?: string;
  headline: string;
  heroTitle: string;
  specializations: string[];
  shortBio: string;
  longBio: string;
  email?: string;
  github?: OptionalLink;
  linkedin?: OptionalLink;
  resumePath?: string;
  availability?: string;
};

export const profile: Profile = {
  name: "Oneidy Constanza-Garcia",
  headline: "AI Application & Automation Engineer",
  heroTitle: "Building intelligent applications. Engineering reliable systems.",
  specializations: ["Python", "backend systems", "REST APIs", "SQL", "automation", "applied AI", "application integrations"],
  shortBio: "I build practical software solutions that connect AI capabilities, backend development, automation, and structured data.",
  longBio: "I work across Python, backend systems, REST APIs, SQL, automation, applied AI, and application integrations, with additional development experience in C#, TypeScript, and JavaScript.",
  email: "oneidyconstanzagarcia@gmail.com",
  github: { label: "GitHub", href: "https://github.com/itsmyfacade" },
  linkedin: { label: "LinkedIn", href: "https://linkedin.com/in/oneidy" },
  resumePath: "/resume/Oneidy_Constanza_Garcia_AI_Engineer.pdf",
  availability: "Open to remote engineering opportunities.",
};
