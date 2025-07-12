function replaceLucideIcons() {
  if (typeof lucide === "undefined") {
    console.warn("Lucide.js not loaded.");
    return;
  }

  const iconMap = {
    "users": "user",
    "user": "user",
    "settings": "settings",
    "edit": "edit-3",
    "plus": "plus-circle",
    "trash": "trash-2",
    "search": "search",
    "calendar": "calendar",
    "file": "file",
    "home": "home",
    "arrow-left": "arrow-left",
    "arrow-right": "arrow-right",
    "getting-started": "home",
    // Add more mappings
  };

  // Replace <use href="#icon-..."> icons
  document.querySelectorAll("svg use").forEach(useTag => {
    const href = useTag.getAttribute("href") || useTag.getAttribute("xlink:href");
    if (!href || !href.startsWith("#icon-")) return;

    const iconKey = href.replace("#icon-", "");
    const lucideIcon = iconMap[iconKey];

    if (lucideIcon && lucide.icons[lucideIcon]) {
      const svg = lucide.icons[lucideIcon].toSvg({ class: "lucide" });
      const wrapper = document.createElement("span");
      wrapper.innerHTML = svg;
      const lucideSvg = wrapper.firstElementChild;

      const parentSvg = useTag.closest("svg");
      if (parentSvg) {
        parentSvg.replaceWith(lucideSvg);
      }
    }
  });

  // Replace <i class="fa fa-...">
  document.querySelectorAll("i.fa").forEach(el => {
    const faIcon = [...el.classList].find(cls => cls.startsWith("fa-"))?.replace("fa-", "");
    const lucideIcon = iconMap[faIcon];
    if (lucideIcon && lucide.icons[lucideIcon]) {
      const svg = lucide.icons[lucideIcon].toSvg({ class: "lucide" });
      const wrapper = document.createElement("span");
      wrapper.innerHTML = svg;
      el.replaceWith(wrapper.firstElementChild);
    }
  });

  lucide.createIcons(); // For <i data-lucide="">
}

// Run on DOM changes
const observer = new MutationObserver(() => replaceLucideIcons());

document.addEventListener("DOMContentLoaded", () => {
  replaceLucideIcons();
  observer.observe(document.body, { childList: true, subtree: true });
});
