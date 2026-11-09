export type OptionalLink = { label: string; href: string };

export type Profile = {
  name?: string;
  headline: string;
  heroTitle: string;
  specializations: string[];
  shortBio: string;
  longBio: string;
  aboutBio: string;
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
  specializations: ["AI applications", "Python software development", "backend and REST APIs", "full-stack systems", "SQL and data workflows", "automation", "cloud-connected integrations"],
  shortBio: "I build practical software solutions that connect AI capabilities, backend development, automation, and structured data.",
  longBio: "I work across AI applications, Python services, REST APIs, SQL and data workflows, automation, full-stack interfaces, and cloud-connected integrations. My broader toolkit includes C#, TypeScript, JavaScript, React, Next.js, and the testing practices that make systems easier to trust.",
  aboutBio: "I approach engineering as the work of connecting systems, solving problems, and making complex ideas operational. As a founder and hands-on technical contributor, I have worked across architecture, application implementation, integrations, data and storage workflows, testing, documentation, and product execution. I value understanding how a system works end to end, not just making one component function in isolation, and I bring that systems thinking to unfamiliar tools, changing requirements, and practical delivery.",
  email: "oneidyconstanzagarcia@gmail.com",
  github: { label: "GitHub", href: "https://github.com/itsmyfacade" },
  linkedin: { label: "LinkedIn", href: "https://linkedin.com/in/oneidy" },
  resumePath: "/resume/Oneidy_Constanza_Garcia_AI_Engineer.pdf",
  availability: "Open to remote engineering opportunities.",
};
