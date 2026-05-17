import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, Calendar, FileText, Mail, MapPin } from "lucide-react";
import { contact, featuredProjects, githubProfile, resumeUrl, skillGroups } from "./projects";
import "./styles.css";

function GithubMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2.02c-3.21.7-3.89-1.38-3.89-1.38-.53-1.34-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.11-.75.41-1.26.74-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.18 1.18A11 11 0 0 1 12 6.09c.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.28 5.69.42.36.79 1.07.79 2.16v3.03c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  );
}

function FiverrMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M23.004 15.588h-2.733v8.412h-5.039v-8.412H7.781V24H2.742v-8.412H0v-4.224h2.742v-1.41C2.742 4.71 6.114 0 11.7 0h3.531v4.224h-3.531c-2.205 0-3.39 1.41-3.39 3.741v1.4h7.451c1.395 0 2.535 1.14 2.535 2.535V11.4h4.708v4.188zm-5.04-12.222a2.412 2.412 0 1 1 0-4.824 2.412 2.412 0 0 1 0 4.824z"
      />
    </svg>
  );
}

function LinkedinMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
      />
    </svg>
  );
}

function Divider() {
  return <div className="divider" aria-hidden="true" />;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Good morning";
  if (h >= 12 && h < 18) return "Good afternoon";
  if (h >= 18 && h < 22) return "Good evening";
  return "Hello";
}

function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <span className="orb orb-a" />
      <span className="orb orb-b" />
      <span className="orb orb-c" />
      <span className="grid" />
    </div>
  );
}

function ProjectRow({ project, index }) {
  const flipped = index % 2 === 1;
  const mediaRef = useRef(null);

  function handleMove(e) {
    const el = mediaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 14).toFixed(2)}deg`);
  }

  function handleLeave() {
    const el = mediaRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <article className={`project-row ${flipped ? "is-flipped" : ""}`}>
      <a
        ref={mediaRef}
        className="project-media"
        href={project.siteUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={project.name}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <img className="media-bg" src={project.screenshot} alt="" aria-hidden="true" />
        <img className="media-fg" src={project.screenshot} alt={`${project.name} preview`} />
        <span className="media-overlay">
          {project.linkLabel || "Visit Site"}
          <ArrowUpRight size={17} aria-hidden="true" />
        </span>
      </a>
      <div className="project-copy">
        <span className="eyebrow">{project.category}</span>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="chips">
          {project.stack.slice(0, 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <a className="project-link" href={project.siteUrl} target="_blank" rel="noreferrer">
          {project.linkLabel || "Visit Site"}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

const experienceItems = [
  {
    role: "Full Stack Developer",
    org: "Premier Store",
    period: "2024 - Now",
    location: "Dallas, TX",
    bullets: [
      "Built and shipped premierstore.us — a storefront with editable walk-in orders and admin workflows.",
      "Owned end-to-end delivery: design, frontend, order flow, and Vercel deploys.",
    ],
  },
  {
    role: "Frontend Developer (Contract)",
    org: "Pexbo · Leave Management Portal",
    period: "2024",
    location: "Remote",
    bullets: [
      "Delivered portal.pexbo.com — leave requests and team workflows in TypeScript / Next.js.",
      "Resolved build and type-safety issues to get the portal production-ready.",
    ],
  },
  {
    role: "Web Developer (Client Work)",
    org: "Lions Flame Soccer Academy",
    period: "2023 - 2024",
    location: "Remote",
    bullets: [
      "Production site with booking, shop pages, Firebase auth and Stripe payment / webhook flows.",
      "Implemented admin tooling and email notifications for a real customer base.",
    ],
  },
];

const educationItems = [
  {
    role: "B.Sc. Computer Engineering",
    org: "Self-directed · Project-based learning",
    period: "Ongoing",
    location: "Dallas, TX",
    bullets: [
      "Building production projects across e-commerce, internal tools, and client websites.",
      "Focus on React, TypeScript, and full-stack delivery on Vercel + Firebase.",
    ],
  },
  {
    role: "Backend Fundamentals · C# / .NET",
    org: "Layered architecture and business rules",
    period: "2022 - 2023",
    location: "Self-paced",
    bullets: [
      "Built ReCapProject — a car rental backend with layered architecture and business rules.",
      "Most-starred public repo on my GitHub; reinforced API design and separation of concerns.",
    ],
  },
];

const extracurricularItems = [
  {
    role: "Open Source Contributor",
    org: "Personal GitHub Projects",
    period: "2022 - Now",
    location: "Remote",
    bullets: [
      "Maintain several public repositories around web development and small business tools.",
      "Use side projects to test new stacks before pulling them into client work.",
    ],
  },
];

function TimelineList({ items }) {
  return (
    <ol className="timeline">
      {items.map((item) => (
        <li className="timeline-item" key={`${item.org}-${item.period}`}>
          <div className="timeline-dot" aria-hidden="true" />
          <div className="timeline-content">
            <h3>{item.role}</h3>
            <div className="timeline-meta">
              <span><Calendar size={14} aria-hidden="true" /> {item.period}</span>
              <span><MapPin size={14} aria-hidden="true" /> {item.location}</span>
            </div>
            <ul className="timeline-bullets">
              {item.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ExperienceSection() {
  const [tab, setTab] = useState("experience");
  const items =
    tab === "experience"
      ? experienceItems
      : tab === "education"
      ? educationItems
      : extracurricularItems;
  return (
    <section className="experience" id="experience">
      <h2 className="visually-hidden">Experience</h2>
      <div className="tabs-bar" role="tablist" aria-label="Experience and education">
        <button
          role="tab"
          aria-selected={tab === "experience"}
          className={`tab-bar-item ${tab === "experience" ? "is-active" : ""}`}
          onClick={() => setTab("experience")}
        >
          Experience
        </button>
        <button
          role="tab"
          aria-selected={tab === "education"}
          className={`tab-bar-item ${tab === "education" ? "is-active" : ""}`}
          onClick={() => setTab("education")}
        >
          Education
        </button>
        <button
          role="tab"
          aria-selected={tab === "extracurricular"}
          className={`tab-bar-item ${tab === "extracurricular" ? "is-active" : ""}`}
          onClick={() => setTab("extracurricular")}
        >
          Extracurricular
        </button>
      </div>
      <div className="tab-panel" role="tabpanel">
        <TimelineList items={items} />
      </div>
    </section>
  );
}

function App() {
  const [greeting, setGreeting] = useState(getGreeting());
  useEffect(() => {
    const id = setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <main>
      <header className="site-header">
        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#hire">Hire</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <HeroBackdrop />
        <div className="intro-card">
          <div className="intro-top">
            <div className="avatar">
              <img src="/profile.png" alt="Ekrem Taskin" />
            </div>
            <div>
              <h1>Ekrem Taskin</h1>
              <p>Full Stack Developer</p>
            </div>
          </div>
          <h2 className="greeting">
            {greeting}
            <span className="wave" aria-hidden="true">!</span>
          </h2>
          <p className="intro-text">
            I'm a software developer based in Dallas, Texas. I build clean web apps, dashboards,
            storefronts, and business tools &mdash; from production e-commerce sites to internal
            tooling for small teams.
          </p>
          <div className="intro-actions">
            <a href={githubProfile} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubMark size={18} />
            </a>
            {contact.linkedinUrl ? (
              <a href={contact.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinMark size={18} />
              </a>
            ) : null}
            {contact.fiverrUrl ? (
              <a href={contact.fiverrUrl} target="_blank" rel="noreferrer" aria-label="Fiverr">
                <FiverrMark size={18} />
              </a>
            ) : null}
            <a href={resumeUrl} target="_blank" rel="noreferrer" aria-label="Resume">
              <FileText size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <Divider />

      <ExperienceSection />

      <Divider />

      <section className="projects" id="projects">
        <h2>Projects</h2>
        <div className="project-list">
          {featuredProjects.map((project, index) => (
            <ProjectRow key={project.repo} project={project} index={index} />
          ))}
        </div>
        <a className="all-projects-button" href={githubProfile} target="_blank" rel="noreferrer">
          View GitHub Profile
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </section>

      <Divider />

      <section className="skills-card" id="skills">
        <h2>Skills</h2>
        <div className="skills-layout">
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <div className="skill-list">
                  {group.items.slice(0, 6).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="resume-card">
            <p>I primarily build web apps across frontend, backend, auth, payments, and deployment.</p>
            <a href={resumeUrl} target="_blank" rel="noreferrer">
              View Resume
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <Divider />

      <section className="hire-card" id="hire">
        <span className="hire-eyebrow">Available for work</span>
        <h2>You wanna hire me?</h2>
        <p>
          I take on freelance web projects &mdash; storefronts, internal tools, and full-stack
          apps. My Fiverr profile is the fastest way to book a slot or message me about your idea.
        </p>
        {contact.fiverrUrl ? (
          <a className="hire-cta" href={contact.fiverrUrl} target="_blank" rel="noreferrer">
            <FiverrMark size={20} />
            View my Fiverr profile
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        ) : null}
        <div className="hire-secondary">
          <a href={githubProfile} target="_blank" rel="noreferrer">
            <GithubMark size={16} />
            GitHub
          </a>
          {contact.linkedinUrl ? (
            <a href={contact.linkedinUrl} target="_blank" rel="noreferrer">
              <LinkedinMark size={16} />
              LinkedIn
            </a>
          ) : null}
        </div>
      </section>

      <Divider />

      <section className="contact-card" id="contact">
        <div className="avatar large">
          <img src="/profile.png" alt="Ekrem Taskin" />
        </div>
        <h2>Contact</h2>
        <p>Available for web projects in Dallas / Fort Worth.</p>
        <div className="contact-links">
          <a href={githubProfile} target="_blank" rel="noreferrer">
            <GithubMark size={18} />
            GitHub
          </a>
          {contact.linkedinUrl ? (
            <a href={contact.linkedinUrl} target="_blank" rel="noreferrer">
              <LinkedinMark size={18} />
              LinkedIn
            </a>
          ) : null}
          {contact.fiverrUrl ? (
            <a href={contact.fiverrUrl} target="_blank" rel="noreferrer">
              <FiverrMark size={18} />
              Fiverr
            </a>
          ) : null}
          {contact.email ? (
            <a href={`mailto:${contact.email}`}>
              <Mail size={20} aria-hidden="true" />
              {contact.email}
            </a>
          ) : null}
          <a href={resumeUrl} target="_blank" rel="noreferrer">
            <FileText size={20} aria-hidden="true" />
            Resume
          </a>
        </div>
      </section>

      <footer>© 2026 Ekrem Taskin</footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
