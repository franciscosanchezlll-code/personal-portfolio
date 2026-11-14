// 1. Dynamic Year in Footer
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Mobile Navigation Toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// 3. Dark / Light Theme Toggle with LocalStorage
const themeToggle = document.getElementById("theme-toggle");
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  htmlEl.setAttribute("data-theme", savedTheme);
}

themeToggle.addEventListener("click", () => {
  const current = htmlEl.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", next);
  localStorage.setItem("portfolio-theme", next);
});

// 4. Typing Animation in Hero Section
const phrases = [
  "Responsive Web Apps.",
  "Clean User Interfaces.",
  "Modular Software.",
  "Interactive Experiences."
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed-text");

function typeLoop() {
  const currentPhrase = phrases[phraseIdx];
  typedEl.textContent = currentPhrase.substring(0, charIdx);

  if (!isDeleting && charIdx < currentPhrase.length) {
    charIdx++;
    setTimeout(typeLoop, 85);
  } else if (isDeleting && charIdx > 0) {
    charIdx--;
    setTimeout(typeLoop, 45);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
    setTimeout(typeLoop, isDeleting ? 1200 : 300);
  }
}
typeLoop();

// 5. Project Category Filter
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

// 6. Scroll Reveal & Active Nav Highlight
const revealEls = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => observer.observe(el));

window.addEventListener("scroll", () => {
  let currentSection = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) {
      currentSection = sec.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// 7. Contact Form Submission Feedback
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  formStatus.textContent = `Thank you, ${name}! Your message has been recorded.`;
  contactForm.reset();
});