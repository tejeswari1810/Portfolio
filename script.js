// Light/dark theme toggle with saved preference
(function () {
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");
  const label = button.querySelector(".theme-toggle__label");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    return root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light");
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    const isDark = theme === "dark";
    button.setAttribute("aria-pressed", String(isDark));
    label.textContent = isDark ? "Light mode" : "Dark mode";
  }

  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  apply(saved || currentTheme());

  button.addEventListener("click", function () {
    const next = currentTheme() === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();
