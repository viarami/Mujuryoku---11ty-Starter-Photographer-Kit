document.addEventListener("DOMContentLoaded", function () {
  const themes = ["bauhaus", "dark-bold", "inyourface", "monochrome", "newspaper", "swiss"];
  const themeStorageKey = "photographer-theme";

  function getCurrentTheme() {
    const themeClass = Array.from(document.body.classList).find((name) => name.endsWith("-theme"));
    return themeClass ? themeClass.replace("-theme", "") : "swiss";
  }

  function getThemeFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const theme = params.get("theme");
    return theme ? theme.toLowerCase() : null;
  }

  function createThemeSwitcher() {
    const themeSwitcher = document.createElement("div");
    themeSwitcher.className = "theme-switcher";
    themeSwitcher.innerHTML = `
      <button class="theme-switcher-button" id="theme-switcher-button" aria-label="Change theme">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </button>
      <div class="theme-switcher-menu" id="theme-switcher-menu">
        <h3 class="theme-switcher-title">Choose a Theme</h3>
        <div class="theme-switcher-options">
          <button class="theme-option" data-theme="swiss">
            <span class="theme-option-name">Swiss</span>
            <span class="theme-option-description">International Typographic Style</span>
          </button>
          <button class="theme-option" data-theme="bauhaus">
            <span class="theme-option-name">Bauhaus</span>
            <span class="theme-option-description">Geometric, modernist design</span>
          </button>
          <button class="theme-option" data-theme="dark-bold">
            <span class="theme-option-name">Dark Bold</span>
            <span class="theme-option-description">Bold typography, dark mode</span>
          </button>
          <button class="theme-option" data-theme="monochrome">
            <span class="theme-option-name">Monochrome</span>
            <span class="theme-option-description">Minimalist black and white</span>
          </button>
          <button class="theme-option" data-theme="newspaper">
            <span class="theme-option-name">Newspaper</span>
            <span class="theme-option-description">Classic newsprint style</span>
          </button>
          <button class="theme-option" data-theme="inyourface">
            <span class="theme-option-name">In Your Face</span>
            <span class="theme-option-description">Maximalist, vibrant design</span>
          </button>
        </div>
      </div>
    `;

    return themeSwitcher;
  }

  function setThemeStylesheet(themeName) {
    const themeStylesheet = document.querySelector('link[href*="/assets/css/themes/"]');
    if (!themeStylesheet) {
      return;
    }

    const currentHref = themeStylesheet.getAttribute("href");
    const parsed = new URL(currentHref, window.location.origin);
    const pathParts = parsed.pathname.split("/");
    pathParts[pathParts.length - 1] = `${themeName}.css`;
    parsed.pathname = pathParts.join("/");
    themeStylesheet.setAttribute("href", `${parsed.pathname}${parsed.search}`);
  }

  function setActiveOption(themeName) {
    document.querySelectorAll(".theme-option").forEach((option) => {
      option.classList.toggle("active", option.getAttribute("data-theme") === themeName);
    });
  }

  function applyTheme(themeName, options = { persist: true }) {
    if (!themes.includes(themeName)) {
      return;
    }

    Array.from(document.body.classList)
      .filter((name) => name.endsWith("-theme"))
      .forEach((name) => {
        document.body.classList.remove(name);
      });

    document.body.classList.add(`${themeName}-theme`);
    setThemeStylesheet(themeName);
    setActiveOption(themeName);

    if (options.persist) {
      localStorage.setItem(themeStorageKey, themeName);
    }
  }

  const themeSwitcher = createThemeSwitcher();
  document.body.appendChild(themeSwitcher);

  const themeSwitcherButton = document.getElementById("theme-switcher-button");
  const themeSwitcherMenu = document.getElementById("theme-switcher-menu");

  themeSwitcherButton.addEventListener("click", function () {
    themeSwitcherMenu.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (!themeSwitcher.contains(event.target)) {
      themeSwitcherMenu.classList.remove("active");
    }
  });

  document.querySelectorAll(".theme-option").forEach((option) => {
    option.addEventListener("click", function () {
      const newTheme = this.getAttribute("data-theme");
      applyTheme(newTheme, { persist: true });
      themeSwitcherMenu.classList.remove("active");
    });
  });

  const currentTheme = getCurrentTheme();
  const themeFromQuery = getThemeFromQuery();
  const savedTheme = localStorage.getItem(themeStorageKey);

  if (themeFromQuery && themes.includes(themeFromQuery)) {
    applyTheme(themeFromQuery, { persist: true });
  } else if (savedTheme && savedTheme !== currentTheme && themes.includes(savedTheme)) {
    applyTheme(savedTheme, { persist: false });
  } else {
    setActiveOption(currentTheme);
  }

  const style = document.createElement("style");
  style.textContent = `
    .theme-switcher {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }

    .theme-switcher .theme-switcher-button {
      background: rgba(255, 255, 255, 0.9);
      border: 2px solid #000;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
    }

    .theme-switcher .theme-switcher-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .theme-switcher .theme-switcher-menu {
      position: absolute;
      bottom: 60px;
      right: 0;
      background: white;
      border: 2px solid #000;
      border-radius: 8px;
      padding: 15px;
      min-width: 280px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.3s ease;
    }

    .theme-switcher .theme-switcher-menu.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .theme-switcher .theme-switcher-title {
      margin: 0 0 10px 0;
      color: black;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .theme-switcher .theme-switcher-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .theme-switcher .theme-option {
      background: transparent;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      padding: 10px 15px;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
    }

    .theme-switcher .theme-option:hover,
    .theme-switcher .theme-option.active {
      background: #f5f5f5;
      border-color: #000;
    }

    .theme-switcher .theme-option-name {
      font-weight: bold;
      font-size: 14px;
    }

    .theme-switcher .theme-option-description {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }

    @media (max-width: 768px) {
      .theme-switcher {
        bottom: 10px;
        right: 10px;
      }

      .theme-switcher .theme-switcher-button {
        width: 40px;
        height: 40px;
      }

      .theme-switcher .theme-switcher-menu {
        min-width: 250px;
        right: -10px;
        bottom: 50px;
      }
    }
  `;

  document.head.appendChild(style);
});
