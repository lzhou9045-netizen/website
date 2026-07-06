const header = document.querySelector(".site-header");
const year = document.querySelector("#year");

const siteConfig = {
  siteUrl: "https://example.com",
  filesUrl: "https://files.example.com",
  panUrl: "https://pan.baidu.com",
  githubUrl: "https://github.com/",
  email: "hello@example.com"
};

function applyConfig() {
  document.querySelectorAll("[data-config]").forEach((element) => {
    const key = element.dataset.config.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
    const value = siteConfig[key];

    if (!value) {
      return;
    }

    if (key === "email") {
      element.href = `mailto:${value}`;
      element.textContent = value;
      return;
    }

    element.href = value;
    if (key === "siteUrl") {
      element.textContent = new URL(value).hostname;
    }
  });
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

year.textContent = new Date().getFullYear();
applyConfig();
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
