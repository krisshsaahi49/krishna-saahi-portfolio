"use client";

import Image from "next/image";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Database,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";
import { FormEvent, useMemo, useRef, useState } from "react";

type Message = {
  role: "bot" | "user";
  content: string;
};

const profile = {
  name: "Krishna Saahi Yavana",
  title: "Seasoned SDET",
  location: "Fort Wayne, Indiana",
  phone: "(260) 760-9574",
  email: "krisshsaahi@outlook.com",
  linkedin: "https://linkedin.com/in/krisshsaahi",
  website: "https://krisshsaahi.dev",
  summary:
    "Experienced SDET with 7+ years building automation frameworks across finance, hospitality, sales, and AI/ML testing. Krishna specializes in Java, JavaScript, Selenium, Rest Assured, Playwright, Cucumber, cloud testing pipelines, and pragmatic quality strategy.",
  highlights: [
    "Authored 1200+ automated API and UI scripts for Gainsight Renewal Center.",
    "Improved code coverage reporting at Wells Fargo from roughly two hours to three minutes with a Java Jsoup utility.",
    "Built 700+ Selenium/TestNG/Maven scripts and 400+ SoapUI/Groovy scripts for Starwood Hotels at Accenture.",
    "Mentored junior engineers, led best-practice training, and partnered with DevOps on Kubernetes and AWS pipeline migration."
  ],
  skills: [
    "Java",
    "JavaScript",
    "Python",
    "Groovy",
    "Selenium",
    "Playwright",
    "Cypress",
    "Appium",
    "Rest Assured",
    "Postman",
    "Cucumber",
    "JUnit",
    "TestNG",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "Azure DevOps",
    "Maven",
    "Gradle"
  ],
  experience: [
    {
      company: "Outlier",
      role: "AI/ML Tester",
      dates: "Sep 2024 - Present",
      place: "Fort Wayne",
      points: [
        "Assesses AI/ML model performance, accuracy, bias, and ethical considerations.",
        "Works with data scientists, developers, and domain experts to validate assumptions and align testing with product goals."
      ]
    },
    {
      company: "Gainsight",
      role: "Senior SDET",
      dates: "Aug 2021 - Dec 2022",
      place: "Hyderabad",
      points: [
        "Led UI automation for Opportunities, Leads, Renewal Center, Gainsight NXT, Hybrid, and Salesforce modules.",
        "Created reusable framework utilities, streamlined multi-level Maven automation, and helped migrate AWS test/development pipelines to Kubernetes."
      ]
    },
    {
      company: "Wells Fargo",
      role: "Software Development Engineer in Test",
      dates: "Jan 2020 - Jul 2021",
      place: "Hyderabad",
      points: [
        "Developed test strategies, managed defects in HP ALM, and built reusable utilities for the automation architecture team.",
        "Created 300+ Cucumber scripts for Selenium, Appium, BrowserStack, and Perfecto Cloud coverage."
      ]
    },
    {
      company: "Accenture",
      role: "Associate SDET",
      dates: "Dec 2016 - Dec 2019",
      place: "Bangalore",
      points: [
        "Implemented and maintained data-driven automation frameworks for Starwood Hotels guest reservations.",
        "Covered smoke, functional, regression, integration, UAT, cross-browser, database, and API validation testing."
      ]
    }
  ],
  education:
    "Master's in Computer Science from Purdue University, Fort Wayne, graduation year 2023-2024."
};

const suggestedQuestions = [
  "What is Krishna's automation experience?",
  "Which tools and languages does Krishna use?",
  "Tell me about Krishna's Gainsight work.",
  "What did Krishna improve at Wells Fargo?",
  "Does Krishna have AI/ML testing experience?",
  "How can I contact Krishna?"
];

function buildAnswer(question: string) {
  const q = question.toLowerCase();

  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("linkedin")) {
    return `You can reach Krishna at ${profile.email} or ${profile.phone}. His LinkedIn is ${profile.linkedin}, and his portfolio URL is ${profile.website}.`;
  }

  if (q.includes("skill") || q.includes("tool") || q.includes("language") || q.includes("tech")) {
    return `Krishna's toolkit spans ${profile.skills.slice(0, 13).join(", ")}, plus databases, AWS, Docker, Kubernetes, Jenkins, Azure DevOps, Maven, and Gradle. His strongest lane is UI, API, DB, mobile, and framework automation.`;
  }

  if (q.includes("gainsight") || q.includes("renewal") || q.includes("salesforce")) {
    return "At Gainsight, Krishna was a Senior SDET who led UI automation for Opportunities and Leads, authored 1200+ automated API/UI scripts for Renewal Center, built reusable framework utilities, mentored junior engineers, and helped migrate AWS testing and development pipelines to Kubernetes.";
  }

  if (q.includes("wells") || q.includes("coverage") || q.includes("jsoup")) {
    return "At Wells Fargo, Krishna built comprehensive test strategies, worked through defect triage, created 300+ Cucumber scripts for web and mobile testing, and engineered a Java Jsoup code coverage utility that reduced reporting time from about two hours to three minutes.";
  }

  if (q.includes("accenture") || q.includes("starwood") || q.includes("soap")) {
    return "At Accenture, Krishna implemented automation frameworks for Starwood Hotels, creating 700+ Selenium/TestNG/Maven scripts and 400+ SoapUI scripts with Groovy for microservice validation, plus broad smoke, regression, integration, UAT, cross-browser, database, and API coverage.";
  }

  if (q.includes("ai") || q.includes("ml") || q.includes("model") || q.includes("bias")) {
    return "Yes. Krishna currently works as an AI/ML Tester at Outlier, evaluating model performance, accuracy, bias, ethical considerations, and alignment with project requirements alongside data scientists, developers, and domain experts.";
  }

  if (q.includes("education") || q.includes("degree") || q.includes("purdue")) {
    return profile.education;
  }

  if (q.includes("experience") || q.includes("background") || q.includes("about")) {
    return `${profile.summary} Key wins include 1200+ scripts at Gainsight, 300+ Cucumber scripts at Wells Fargo, and major automation coverage for Starwood Hotels at Accenture.`;
  }

  return "Krishna is a seasoned SDET with 7+ years of experience in UI, API, database, mobile, cloud, and AI/ML testing. Ask me about his skills, Gainsight work, Wells Fargo impact, Accenture experience, AI/ML testing, education, or contact details.";
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hi, I am Krishna's portfolio assistant. Ask me about his automation work, AI/ML testing, tools, education, or how to contact him."
    }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const groupedSkills = useMemo(
    () => [
      { label: "Automation", items: ["Selenium", "Playwright", "Cypress", "Appium", "Rest Assured"] },
      { label: "Languages", items: ["Java", "JavaScript", "Python", "Groovy"] },
      { label: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "Jenkins", "Azure DevOps"] },
      { label: "Quality Practice", items: ["BDD", "TDD", "Postman", "BrowserStack", "Perfecto"] }
    ],
    []
  );

  function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { role: "user", content: trimmed },
      { role: "bot", content: buildAnswer(trimmed) }
    ]);
    setInput("");
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  return (
    <main>
      <section className="hero" id="home">
        <Image
          src="/hero-automation.png"
          alt="Automation engineering workstation with testing dashboards"
          fill
          priority
          className="heroImage"
          sizes="100vw"
        />
        <div className="heroShade" />
        <nav className="nav" aria-label="Primary navigation">
          <a href="#home" className="brand" aria-label="Krishna Saahi Yavana home">
            KS
          </a>
          <div className="navLinks">
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#chat">Ask Krishna</a>
          </div>
        </nav>

        <div className="heroContent">
          <div className="heroCopy">
            <p className="eyebrow">
              <ShieldCheck size={16} aria-hidden="true" />
              UI, API, DB, Mobile, Cloud & AI/ML Testing
            </p>
            <h1>{profile.name}</h1>
            <p className="heroLead">{profile.summary}</p>
            <div className="heroActions">
              <a className="primaryAction" href="#chat">
                <MessageSquareText size={18} aria-hidden="true" />
                Ask the chatbot
              </a>
              <a className="secondaryAction" href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" />
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Career highlights">
        <div>
          <strong>7+</strong>
          <span>Years in quality engineering</span>
        </div>
        <div>
          <strong>1200+</strong>
          <span>Automated scripts at Gainsight</span>
        </div>
        <div>
          <strong>200%</strong>
          <span>Automation efficiency focus</span>
        </div>
        <div>
          <strong>3 min</strong>
          <span>Code coverage reporting turnaround</span>
        </div>
      </section>

      <section className="section twoColumn" id="chat">
        <div className="sectionIntro">
          <p className="eyebrow dark">
            <Bot size={16} aria-hidden="true" />
            Interactive Profile Assistant
          </p>
          <h2>Ask about Krishna</h2>
          <p>
            The assistant is preloaded from Krishna's resume and answers common recruiter and hiring-manager questions instantly.
          </p>
          <div className="contactList">
            <a href={`mailto:${profile.email}`}>
              <Mail size={17} aria-hidden="true" />
              {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}>
              <Phone size={17} aria-hidden="true" />
              {profile.phone}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <ExternalLink size={17} aria-hidden="true" />
              LinkedIn
            </a>
            <span>
              <MapPin size={17} aria-hidden="true" />
              {profile.location}
            </span>
          </div>
        </div>

        <div className="chatPanel" aria-label="Portfolio chatbot">
          <div className="chatHeader">
            <Bot size={21} aria-hidden="true" />
            <div>
              <strong>Krishna Bot</strong>
              <span>Resume-trained local assistant</span>
            </div>
          </div>
          <div className="suggestions" aria-label="Suggested questions">
            {suggestedQuestions.map((question) => (
              <button key={question} type="button" onClick={() => ask(question)}>
                {question}
              </button>
            ))}
          </div>
          <div className="messages" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`message ${message.role}`}>
                {message.content}
              </div>
            ))}
          </div>
          <form className="chatForm" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about tools, projects, education..."
              aria-label="Ask Krishna's chatbot a question"
            />
            <button type="submit" aria-label="Send question">
              <Send size={18} aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="sectionHeading">
          <p className="eyebrow dark">
            <BriefcaseBusiness size={16} aria-hidden="true" />
            Professional Experience
          </p>
          <h2>Automation impact across enterprise teams</h2>
        </div>
        <div className="timeline">
          {profile.experience.map((job) => (
            <article className="job" key={`${job.company}-${job.role}`}>
              <div className="jobMeta">
                <span>{job.dates}</span>
                <span>{job.place}</span>
              </div>
              <h3>{job.role}</h3>
              <p>{job.company}</p>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={17} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section skillsSection" id="skills">
        <div className="sectionHeading">
          <p className="eyebrow dark">
            <Workflow size={16} aria-hidden="true" />
            Core Strengths
          </p>
          <h2>Frameworks, pipelines, and test strategy</h2>
        </div>
        <div className="skillGrid">
          {groupedSkills.map((group) => (
            <article className="skillGroup" key={group.label}>
              <h3>{group.label}</h3>
              <div>
                {group.items.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section impactBand">
        <div>
          <p className="eyebrow dark">
            <Sparkles size={16} aria-hidden="true" />
            Selected Wins
          </p>
          <h2>Built for repeatable quality at scale</h2>
        </div>
        <div className="impactList">
          {profile.highlights.map((highlight) => (
            <p key={highlight}>
              <ArrowRight size={18} aria-hidden="true" />
              {highlight}
            </p>
          ))}
        </div>
      </section>

      <section className="section education">
        <div>
          <p className="eyebrow dark">
            <GraduationCap size={16} aria-hidden="true" />
            Education
          </p>
          <h2>Purdue University, Fort Wayne</h2>
          <p>{profile.education}</p>
        </div>
        <div>
          <p className="eyebrow dark">
            <Database size={16} aria-hidden="true" />
            Data & API Testing
          </p>
          <h2>Backend confidence</h2>
          <p>
            Krishna pairs API automation with database validation, defect triage, CI/CD integration, and reusable test utilities.
          </p>
        </div>
      </section>

      <footer>
        <span>Krishna Saahi Yavana</span>
        <a href={profile.website}>{profile.website.replace("https://", "")}</a>
      </footer>
    </main>
  );
}
