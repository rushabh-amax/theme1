// console.log("✅ page_custom.js loaded");

// function injectModuleLinkToSearchForm() {
//   const searchForm = document.querySelector('form[role="search"]');

//   if (!searchForm) {
//     console.warn("⏳ Search form not found. Retrying...");
//     setTimeout(injectModuleLinkToSearchForm, 500);
//     return;
//   }

//   // Avoid duplicate
//   if (document.getElementById("module-nav-link")) return;

//   // Create <li> or better: <div> for consistent styling inside a form
//   const moduleBtn = document.createElement("div");
//   moduleBtn.className = "customMoule ml-2"; // spacing on left
//   moduleBtn.id = "module-nav-link";
//   moduleBtn.innerHTML = `
//     <a class="nav-link d-flex align-items-center" href="/module">
//       <i data-feather="grid" class="mr-1"></i>
//     </a>
//   `;

//   searchForm.appendChild(moduleBtn);
//   console.log("✅ Module link injected into search form");

//   // Replace Feather icon
//   if (window.feather) feather.replace();
// }

// // Ensure DOM + ERPNext is ready
// frappe.after_ajax(() => {
//   injectModuleLinkToSearchForm();
// });


function replaceFeatherIcons() {
  if (typeof feather === "undefined") {
    console.warn("Feather.js not found.");
    return;
  }

  const iconMap = {
    "getting-started": "home",
    "users": "user",
    "user": "user",
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
    "tools": "tool",
    "modules": "grid",
    // Add more mappings as needed
  };

  // Replace SVG sprite <use> tags
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

      const parentSvg = useTag.closest("svg");
      if (parentSvg) {
        parentSvg.replaceWith(featherSvg);
      }
    }
  });

  // Replace any <i class="fa fa-xxx"> tags
  document.querySelectorAll("i.fa").forEach(el => {
    const faIcon = [...el.classList].find(cls => cls.startsWith("fa-"))?.replace("fa-", "");
    const featherIcon = iconMap[faIcon];
    if (featherIcon && feather.icons[featherIcon]) {
      const svg = feather.icons[featherIcon].toSvg({ class: "feather" });
      const wrapper = document.createElement("span");
      wrapper.innerHTML = svg;
      el.replaceWith(wrapper.firstElementChild);
    }
  });

  feather.replace(); // Also processes <i data-feather="">
}

// Observe all DOM changes (sidebar, forms, modals, etc.)
const observer = new MutationObserver(() => replaceFeatherIcons());

document.addEventListener("DOMContentLoaded", () => {
  replaceFeatherIcons();

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
