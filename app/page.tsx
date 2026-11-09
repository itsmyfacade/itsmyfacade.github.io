import { type GalleryImage, ImageLightbox } from "../components/ImageLightbox";
import { Reveal } from "../components/Reveal";
import { experience } from "../content/experience";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { skillGroups } from "../content/skills";

const evidenceByProject = {
  aegis: [
    ["/project-media/aegis-01.png", "AEGIS investigation workspace", "Hosted-lite incident investigation interface."],
    ["/project-media/aegis-02.png", "AEGIS completed assessment", "Evidence-grounded findings and execution details."],
    ["/project-media/aegis-03.png", "AEGIS evidence explorer", "Evidence references and investigation trace."],
    ["/project-media/github-actions-ci-1.png", "AEGIS GitHub Actions", "CI workflow evidence for Python quality and regression checks."],
  ],
  observatory: [
    ["/project-media/observatory-report-1.png", "Executive Overview", "Power BI Executive Overview page using synthetic demonstration data."],
    ["/project-media/observatory-report-2.png", "Retrieval and Evidence", "Power BI retrieval and evidence analysis page."],
    ["/project-media/observatory-report-3.png", "Performance and Reliability", "Power BI workflow and reliability analysis page."],
    ["/project-media/observatory-report-4.png", "Investigation Detail", "Power BI investigation detail drill-through page."],
    ["/project-media/observatory-report-5.png", "Investigation Explorer", "Power BI investigation explorer page."],
  ],
} as const;

function EvidenceGallery({ slug }: { slug: keyof typeof evidenceByProject }) {
  const images: GalleryImage[] = evidenceByProject[slug].map(([src, title, caption]) => ({ src, title, caption }));
  return <ImageLightbox images={images} projectLabel={slug === "aegis" ? "AEGIS" : "AEGIS Intelligence Observatory"} />;
}

function hasEvidenceGallery(slug: string): slug is keyof typeof evidenceByProject {
  return slug in evidenceByProject;
}

function ProjectCaseStudy({ project }: { project: (typeof projects)[number] }) {
  return <Reveal className="case-study-wrap"><article id={project.slug} className={`case-study case-${project.accent}`}>
    <div className="case-index"><span>{project.number}</span><span>{project.discipline}</span></div>
    <div className="case-heading"><div><p className="eyebrow">FLAGSHIP CASE STUDY</p><h2>{project.title}</h2></div><div><p className="case-summary">{project.summary}</p>{project.links && <div className="case-links">{project.links.map(link => <a className="case-link" key={link.href} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>{link.label} ↗</a>)}</div>}{project.slug === "observatory" && <div className="case-links"><a className="case-link" href="/observatory/">Open interactive browser companion ↗</a><a className="case-link" href="/downloads/AEGIS-Intelligence-Observatory.pbix" download>Download Power BI Report (.pbix) ↗</a><p className="case-note">The browser dashboard is a static synthetic-data companion; the downloadable PBIX is the native Power BI report.</p></div>}</div></div>
    <div className="case-grid"><div><h3>Problem</h3><p>{project.problem}</p><h3>Solution</h3><p>{project.solution}</p></div><div className="case-facts"><div><span>Architecture</span><div className="pill-list">{project.architecture.map(item => <span key={item}>{item}</span>)}</div></div><div><span>Engineering decisions</span><ul>{project.decisions.map(item => <li key={item}>{item}</li>)}</ul></div></div></div>
    <div className="case-bottom"><div><span>Validation</span><div className="validation-list">{project.validation.map(item => <span key={item}>✓ {item}</span>)}</div></div><div><span>Demonstrable outcomes</span><ul>{project.outcomes.map(item => <li key={item}>{item}</li>)}</ul></div><div><span>Honest limitations</span><ul>{project.limitations.map(item => <li key={item}>{item}</li>)}</ul></div></div>{hasEvidenceGallery(project.slug) && <EvidenceGallery slug={project.slug} />}
  </article></Reveal>;
}

export default function Home() {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header"><a className="brand" href="#top" aria-label="Return to home">{profile.name ?? "AEGIS"}</a><nav aria-label="Primary navigation"><a href="#work">Work</a><a href="#capabilities">Capabilities</a><a href="#about">About</a>{profile.resumePath && <a href={profile.resumePath}>Resume ↗</a>}{profile.email && <a className="nav-cta" href={`mailto:${profile.email}`}>Contact <span>↗</span></a>}</nav></header>
    <main id="top"><div id="main-content" tabIndex={-1} />
      <section className="hero"><Reveal><p className="eyebrow"><span className="pulse" /> {profile.name} · {profile.headline}</p><h1>{profile.heroTitle}</h1><div className="hero-bottom"><div><p>{profile.shortBio}</p>{profile.availability && <p className="availability">{profile.availability}</p>}<div className="hero-actions"><a className="text-link" href="#work">Explore selected work ↘</a>{profile.resumePath && <a className="text-link" href={profile.resumePath}>Download resume ↗</a>}</div></div><a className="circle-link" href="#work" aria-label="Explore selected work">↓</a></div></Reveal></section>
      <section id="work" className="section work"><div className="section-label">SELECTED ENGINEERING WORK <span>04 FLAGSHIP SYSTEMS</span></div><div className="project-grid">{projects.map(project => <Reveal key={project.slug}><a className={`project-card project-${project.accent}`} href={`#${project.slug}`}><div className="project-top"><span>{project.number}</span><span aria-hidden="true">↗</span></div><div><p className="eyebrow">{project.discipline}</p><h2>{project.title}</h2><p>{project.summary}</p></div><div className="project-footer"><span>Read case study</span><span className="project-line" /></div></a></Reveal>)}</div></section>
      <section id="capabilities" className="section capabilities"><div className="section-label">TECHNICAL CAPABILITIES <span>TOOLS I USE TO SHIP</span></div><div className="capability-layout"><div><h2>Across the seams<br /><em>of a system.</em></h2><p>{profile.longBio}</p></div><div className="skill-groups">{skillGroups.map(group => <section className="skill-group" key={group.label}><h3>{group.label}</h3><div className="skill-list">{group.items.map(skill => <span key={skill}>{skill}</span>)}</div></section>)}</div></div></section>
      <section className="section approach"><div className="section-label">ENGINEERING APPROACH <span>HOW I WORK</span></div><div className="approach-grid">{experience.map((entry, index) => <Reveal key={entry.title}><article><span className="index">0{index + 1}</span><h3>{entry.title}</h3><p>{entry.detail}</p></article></Reveal>)}</div></section>
      <section id="aegis-case-studies" className="case-studies"><div className="section-intro"><p className="eyebrow">CASE STUDIES</p><h2>Work that can be<br /><em>explained end to end.</em></h2><p className="section-note">Two systems, documented from contract to validation. Synthetic measurements are labeled as such; unverified capabilities stay visible as limitations.</p></div>{projects.map(project => <ProjectCaseStudy key={project.slug} project={project} />)}</section>
      <section id="about" className="section about"><div className="section-label">ABOUT THE ENGINEER <span>CONTEXT AND BOUNDARIES</span></div><div className="about-grid"><div><h2>Curious enough to inspect.<br /><em>Disciplined enough to verify.</em></h2></div><div><p className="large-copy">{profile.aboutBio}</p><p className="muted">I am building depth through practical projects, deliberate testing, and continuous technical learning.</p></div></div></section>
      {(profile.email || profile.resumePath || profile.github || profile.linkedin) && <section id="contact" className="contact section"><p className="eyebrow">NEXT CONVERSATION</p><h2>Let’s talk about<br /><em>the system.</em></h2><div className="contact-links">{profile.email && <a href={`mailto:${profile.email}`}>Email ↗</a>}{profile.github && <a href={profile.github.href}>{profile.github.label} ↗</a>}{profile.linkedin && <a href={profile.linkedin.href}>{profile.linkedin.label} ↗</a>}{profile.resumePath && <a href={profile.resumePath}>Resume ↗</a>}</div></section>}
    </main>
    <footer><span className="brand">{profile.name ?? "AEGIS"}</span><span>{profile.headline}</span><span>© 2026</span></footer>
  </>;
}
