document.addEventListener("DOMContentLoaded", function () {
  if (typeof feather === "undefined") {
    console.warn("Feather icons not loaded.");
    return;
  }

  const iconMap = {
    "users": "user",
    "edit": "edit-3",
    "plus": "plus-circle",
    "trash": "trash-2",
    "calendar": "calendar",
    "settings": "settings",
    "search": "search",
    "arrow-right": "arrow-right",
    "arrow-left": "arrow-left",
    "file": "file-text",
    "home": "home",
    // add more as needed
  };

  // Replace all ERPNext sprite icons like <use href="#icon-users">
  document.querySelectorAll("svg use").forEach(useTag => {
    const href = useTag.getAttribute("href") || useTag.getAttribute("xlink:href");
    if (!href || !href.startsWith("#icon-")) return;

    const iconKey = href.replace("#icon-", "");
    const featherIcon = iconMap[iconKey];

    if (featherIcon && feather.icons[featherIcon]) {
      const svg = feather.icons[featherIcon].toSvg({ class: "feather" });
      const wrapper = document.createElement("span");
      wrapper.innerHTML = svg;
      const featherSvg = wrapper.firstElementChild;

      // Replace the parent <svg> with feather icon
      const parentSvg = useTag.closest("svg");
      if (parentSvg) {
        parentSvg.replaceWith(featherSvg);
      }
    }
  });

  // Fallback to standard feather replacement
  feather.replace();
});
