// document.addEventListener("DOMContentLoaded", function () {
//   const modulesContainer = document.getElementById("modules-container");
//   const searchBox = document.getElementById("search-box");

//   // ✅ Manual HIMS modules: module_name, icon_module, path
//   const modules = [
//     { module_name: "OPD", icon_module: "opd.svg", path: "/app/opd" },
//     { module_name: "IPD", icon_module: "ipd.svg", path: "/app/ipd" },
//     { module_name: "Pharmacy", icon_module: "pharmacy.svg", path: "/app/pharmacy" },
//     { module_name: "Laboratory", icon_module: "laboratory.svg", path: "/app/lab-test" },
//     { module_name: "Radiology", icon_module: "radiology.svg", path: "/app/radiology" },
//     { module_name: "Billing", icon_module: "billing.svg", path: "/app/sales-invoice" },
//     { module_name: "Appointments", icon_module: "appointments.svg", path: "/app/appointment" },
//     { module_name: "Doctors", icon_module: "doctors.svg", path: "/app/healthcare-practitioner" },
//     { module_name: "Patients", icon_module: "patients.svg", path: "/app/patient" },
//     { module_name: "Nursing", icon_module: "nursing.svg", path: "/app/nursing" },
//     { module_name: "Invoicing", icon_module: "invoicing.svg", path: "/app/sales-invoice" },
//     { module_name: "Inventory", icon_module: "inventory.svg", path: "/app/item" },
//     { module_name: "Vitals", icon_module: "vitals.svg", path: "/app/patient-vital" },
//     { module_name: "Reports", icon_module: "reports.svg", path: "/app/query-report" }
//   ];

//   // 🔁 Icon loader
//   const getIconHTML = (icon_module, module_name) => {
//     return `<img src="/assets/your_custom_app/icons/${icon_module}" 
//                  onerror="this.src='/assets/your_custom_app/icons/default.svg'" 
//                  alt="${module_name}" 
//                  class="svg-icon" />`;
//   };

//   // 🧩 Render module cards
//   function renderModules(filter = "") {
//     modulesContainer.innerHTML = "";
//     const filtered = modules.filter(m =>
//       m.module_name.toLowerCase().includes(filter.toLowerCase())
//     );

//     if (filtered.length === 0) {
//       modulesContainer.innerHTML = `<p style="padding:1rem; text-align:center; color:gray;">No modules found.</p>`;
//       return;
//     }

//     filtered.forEach((mod, i) => {
//       const card = document.createElement("div");
//       card.className = "module-card fade-in";
//       card.style.animationDelay = `${i * 40}ms`;
//       card.innerHTML = `
//         <div class="icon">${getIconHTML(mod.icon_module, mod.module_name)}</div>
//         <div class="name">${mod.module_name}</div>
//       `;

//       card.addEventListener("click", () => {
//         window.location.href = mod.path;
//       });

//       modulesContainer.appendChild(card);
//     });
//   }

//   // 🔍 Search filter
//   searchBox.addEventListener("input", (e) => {
//     renderModules(e.target.value);
//   });

//   // ⏩ Initial render
//   renderModules();

//   // 👤 Inject link into user dropdown menu
//   const tryInjectButton = () => {
//     const userDropdown = document.querySelector(".dropdown-navbar-user .dropdown-menu");
//     if (!userDropdown || document.getElementById("nav-modules-link")) return;

//     const menuItem = document.createElement("li");
//     menuItem.innerHTML = `
//       <a id="nav-modules-link" href="/module" style="display: flex; align-items: center;">
//         <img src="/assets/your_custom_app/icons/grid.svg" style="width:16px;height:16px;margin-right:6px;">
//         Go to Modules
//       </a>`;
//     userDropdown.insertBefore(menuItem, userDropdown.firstChild);
//   };

//   setTimeout(tryInjectButton, 1000);
// });



document.addEventListener("DOMContentLoaded", function () {
  const modulesContainer = document.getElementById("modules-container");
  const searchBox = document.getElementById("search-box");

  // ✅ Manual HIMS modules: name, icon (feather), path
  const modules = [
    { module_name: "OPD", icon_module: "activity.svg", path: "/app/opd" },
    { module_name: "IPD", icon_module: "home.svg", path: "/app/ipd" },
    { module_name: "Pharmacy", icon_module: "package.svg", path: "/app/pharmacy" },
    { module_name: "Laboratory", icon_module: "thermometer.svg", path: "/app/lab-test" },
    { module_name: "Radiology", icon_module: "image.svg", path: "/app/radiology" },
    { module_name: "Billing", icon_module: "credit-card.svg", path: "/app/sales-invoice" },
    { module_name: "Appointments", icon_module: "calendar.svg", path: "/app/appointment" },
    { module_name: "Doctors", icon_module: "user.svg", path: "/app/healthcare-practitioner" },
    { module_name: "Patients", icon_module: "users.svg", path: "/app/patient" },
    { module_name: "Nursing", icon_module: "heart.svg", path: "/app/nursing" },
    { module_name: "Invoicing", icon_module: "file-text.svg", path: "/app/sales-invoice" },
    { module_name: "Inventory", icon_module: "layers.svg", path: "/app/item" },
    { module_name: "Vitals", icon_module: "activity.svg", path: "/app/patient-vital" },
    { module_name: "Reports", icon_module: "bar-chart-2.svg", path: "/app/query-report" }
  ];

  const getIconHTML = (icon_module, module_name) => {
    return `<img src="/assets/theme1/feather-main/icons/${icon_module}" 
                 onerror="this.src='/assets/theme1/feather-main/icons/help-circle.svg'" 
                 alt="${module_name}" 
                 class="svg-icon" />`;
  };

  function renderModules(filter = "") {
    modulesContainer.innerHTML = "";
    const filtered = modules.filter(m =>
      m.module_name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      modulesContainer.innerHTML = `<p style="padding:1rem; text-align:center; color:gray;">No modules found.</p>`;
      return;
    }

    filtered.forEach((mod, i) => {
      const card = document.createElement("div");
      card.className = "module-card fade-in";
      card.style.animationDelay = `${i * 40}ms`;
      card.innerHTML = `
        <div class="icon">${getIconHTML(mod.icon_module, mod.module_name)}</div>
        <div class="name">${mod.module_name}</div>
      `;

      card.addEventListener("click", () => {
        window.location.href = mod.path;
      });

      modulesContainer.appendChild(card);
    });
  }

  renderModules();

  searchBox.addEventListener("input", (e) => {
    renderModules(e.target.value);
  });

  // ✅ Inject into user dropdown
  const tryInjectButton = () => {
    const userDropdown = document.querySelector(".dropdown-navbar-user .dropdown-menu");
    if (!userDropdown || document.getElementById("nav-modules-link")) return;

    const menuItem = document.createElement("li");
    menuItem.innerHTML = `
      <a id="nav-modules-link" href="/module" style="display: flex; align-items: center;">
        <img src="/assets/theme1/feather-main/icons/grid.svg" 
             style="width:16px;height:16px;margin-right:6px;">
        Go to Modules
      </a>`;
    userDropdown.insertBefore(menuItem, userDropdown.firstChild);
  };

  setTimeout(tryInjectButton, 1000);
});
