document.getElementById("year").textContent = new Date().getFullYear();

const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function closeNav() {
  navLinks.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
}

toggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
    closeNav();
    toggle.focus();
  }
});

const sections = document.querySelectorAll("main section[id]");
const navByHash = new Map(
  Array.from(navLinks.querySelectorAll("a")).map((a) => [a.getAttribute("href"), a])
);

if ("IntersectionObserver" in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = navByHash.get(`#${entry.target.id}`);
        if (!link) return;
        if (entry.isIntersecting) {
          navByHash.forEach((a) => a.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => spy.observe(section));
}
