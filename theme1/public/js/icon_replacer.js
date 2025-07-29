// import { icons } from "lucide"; // or import heroicons manually

// function replaceAllIcons() {
//   document.querySelectorAll("i, svg use").forEach(el => {
//     let iconName = el.getAttribute("data-icon") || el.className?.split("fa-")[1];
//     if (!iconName) return;

//     // Optional: map FA icon names to Heroicon equivalents
//     const heroIconMap = {
//       "user": "user-circle",
//       "edit": "pencil-square",
//       "plus": "plus",
//       "trash": "trash",
//       "calendar": "calendar-days",
//       "settings": "cog-6-tooth",
//       "search": "magnifying-glass",
//     };

//     const heroIcon = heroIconMap[iconName];
//     if (heroIcon) {
//       const newIcon = document.createElement("span");
//       newIcon.innerHTML = `<svg class="h-5 w-5 text-gray-600">${icons[heroIcon]?.contents || ""}</svg>`;
//       el.replaceWith(newIcon.firstChild);
//     }
//   });
// }

// frappe.ready(() => {
//   replaceAllIcons();
//   // Optional: hook into SPA events
//   frappe.router.after_load = replaceAllIcons;
// });
