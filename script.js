const lines = [
  "I solve problems, run RCA, and ship practical improvements.",
  "I troubleshoot production issues and build reliable fixes.",
  "I turn technical findings into clear action and impact."
];

const typingEl = document.getElementById("typing");
let lineIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingEl) return;
  const current = lines[lineIndex];

  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }
  setTimeout(typeLoop, deleting ? 25 : 45);
}

typeLoop();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const toggleBtn = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  if (toggleBtn) toggleBtn.textContent = "☀️";
}

toggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  toggleBtn.textContent = isLight ? "☀️" : "🌙";
});
