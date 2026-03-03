(() => {
  const STORAGE_KEY = "luna-theme";
  const root = document.documentElement;
  const toggleBtn = document.getElementById("themeToggle");

  const setTheme = (theme) => {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      toggleBtn?.querySelector("i")?.classList.remove("bi-moon-stars");
      toggleBtn?.querySelector("i")?.classList.add("bi-sun");
    } else {
      root.removeAttribute("data-theme");
      toggleBtn?.querySelector("i")?.classList.remove("bi-sun");
      toggleBtn?.querySelector("i")?.classList.add("bi-moon-stars");
    }
  };

  const getPreferredTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Init theme
  const initial = getPreferredTheme();
  setTheme(initial);
  localStorage.setItem(STORAGE_KEY, initial);

  toggleBtn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Bootstrap-style validation
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
