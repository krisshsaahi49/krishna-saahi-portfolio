const profile = {
  email: "krisshsaahi@outlook.com",
  phone: "(260) 760-9574",
  linkedin: "https://linkedin.com/in/krisshsaahi",
  website: "https://krisshsaahi.dev",
  summary:
    "Experienced SDET with 7+ years building automation frameworks across finance, hospitality, sales, and AI/ML testing. Krishna specializes in Java, JavaScript, Selenium, Rest Assured, Playwright, Cucumber, cloud testing pipelines, and pragmatic quality strategy.",
  education: "Master's in Computer Science from Purdue University, Fort Wayne, graduation year 2023-2024.",
  skills:
    "Java, JavaScript, Python, Groovy, Selenium, Playwright, Cypress, Appium, Rest Assured, Postman, Cucumber, JUnit, TestNG, MongoDB, PostgreSQL, AWS, Docker, Kubernetes, Jenkins, Azure DevOps, Maven, and Gradle"
};

function buildAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("linkedin")) {
    return `You can reach Krishna at ${profile.email} or ${profile.phone}. His LinkedIn is ${profile.linkedin}, and his portfolio URL is ${profile.website}.`;
  }

  if (q.includes("skill") || q.includes("tool") || q.includes("language") || q.includes("tech")) {
    return `Krishna's toolkit spans ${profile.skills}. His strongest lane is UI, API, DB, mobile, and framework automation.`;
  }

  if (q.includes("gainsight") || q.includes("renewal") || q.includes("salesforce")) {
    return "At Gainsight, Krishna led UI automation for Opportunities and Leads, authored 1200+ automated API/UI scripts for Renewal Center, built reusable framework utilities, mentored junior engineers, and helped migrate AWS testing and development pipelines to Kubernetes.";
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

function addMessage(messages, role, content) {
  const bubble = document.createElement("div");
  bubble.className = `message ${role}`;
  bubble.textContent = content;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function initChatbot() {
  const form = document.querySelector("[data-chat-form]");
  const input = document.querySelector("[data-chat-input]");
  const messages = document.querySelector("[data-chat-messages]");
  const suggestions = document.querySelectorAll("[data-question]");

  if (!form || !input || !messages) return;

  const ask = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    addMessage(messages, "user", trimmed);
    window.setTimeout(() => addMessage(messages, "bot", buildAnswer(trimmed)), 180);
    input.value = "";
    input.focus();
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    ask(input.value);
  });

  suggestions.forEach((button) => {
    button.addEventListener("click", () => ask(button.dataset.question || ""));
  });
}

initChatbot();
