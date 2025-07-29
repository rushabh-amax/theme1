function initSidebarToggleButton() {
  

  const currentPath = window.location.pathname;

  const appRootRouteRegex = /^\/app\/[^/]+$/;

  if (!appRootRouteRegex.test(currentPath)) {
    return; // 🚫 Don't show toggle if not /app/single
  }

  const sidebar = document.querySelector(".layout-side-section");
  const pageHead = document.querySelector(".page-head-content");

  if (!sidebar || !pageHead) {
    // Retry if elements are not loaded yet
    setTimeout(initSidebarToggleButton, 200);
    return;
  }

  // ✅ Avoid adding the button multiple times
  if (pageHead.querySelector(".custom-sidebar-toggle")) return;

  // ✅ Create the toggle button
  const toggleButton = document.createElement("button");
  toggleButton.innerHTML = "☰";
  toggleButton.className = "btn btn-outline-secondary btn-sm me-2 custom-sidebar-toggle";
  toggleButton.title = "Toggle Sidebar";

  // ✅ Insert at the beginning of page head
  pageHead.prepend(toggleButton);

  let isExpanded = true;

  toggleButton.addEventListener("click", function () {
    isExpanded = !isExpanded;

    if (isExpanded) {
      expandSidebar(sidebar);
    } else {
      collapseSidebar(sidebar);
    }
  });
}

// 🔁 Run after page loads
frappe.after_ajax(() => {
  initSidebarToggleButton();
});



function collapseSidebar(sidebar) {
  sidebar.classList.add("w-60px", "px-2");
  sidebar.classList.remove("col-lg-2", "col-md-3");

  document.querySelectorAll(".standard-sidebar-item .sidebar-item-label").forEach(el => {
    el.classList.add("d-none");
  });

  document.querySelectorAll(".sidebar-item-icon .icon").forEach(el => {
    el.style.transform = "scale(1.15)";
    // el.classList.add("ml-3");
    el.classList.remove("icon-md");
    el.classList.add("icon-lg");
    el.style.transition = "transform 0.2s ease";
  });

  // ✅ Corrected selector here
  document.querySelectorAll('[data-page-route="Workspaces"] .standard-sidebar-item .item-anchor').forEach(el => {
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
  });

  document.querySelectorAll(".standard-sidebar-item").forEach(el => {
    el.classList.add("justify-content-center");
    el.classList.remove("justify-content-start");
  });

  console.log("Sidebar collapsed");
}


function expandSidebar(sidebar) {
  sidebar.classList.remove("col-auto");
  sidebar.classList.add("col-lg-2", "col-md-3");

  document.querySelectorAll(".standard-sidebar-item .sidebar-item-label").forEach(el => {
    el.classList.remove("d-none");
  });

  document.querySelectorAll(".standard-sidebar-item").forEach(el => {
    el.classList.remove("justify-content-center");
    el.classList.add("justify-content-start");
  });

    document.querySelectorAll(".sidebar-item-icon .icon").forEach(el => {
    el.style.transform = "scale(1)";
    el.style.marginLeft = "unset";

    el.classList.remove("ml-3")
    el.classList.remove("icon-lg")
    el.classList.add("icon-md")
    el.style.transition = "transform 0.2s ease";
  });

  console.log("Sidebar expanded");

  
}

// Init on DOM load
document.addEventListener("DOMContentLoaded", initSidebarToggleButton);


function movePageHeadContent() {
  const observer = new MutationObserver(() => {
    const source = document.querySelector(".page-head-content");
    const target = document.querySelector(".layout-main-section-wrapper");
    source.classList.add("py-2")

    if (source && target) {
      // Move the source element into the target as the first child
      target.insertBefore(source, target.firstChild);

      console.log("✅ Moved .page-head-content into .layout-main-section-wrapper");

      // Stop observing once done
      observer.disconnect();
    }
  });

  // Start observing changes in the body subtree
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Run it after DOM is ready
document.addEventListener("DOMContentLoaded", movePageHeadContent);





// function restructureLayout() {
//   const navbarLogo = document.querySelector(".navbar-brand.navbar-home");
//   if (!navbarLogo) return;

//   const sidebarLayouts = document.querySelectorAll(".layout-side-section");

//   for (const layout of sidebarLayouts) {
//     const listSidebar = layout.querySelector(".list-sidebar");
//     if (listSidebar && !layout.contains(navbarLogo)) {
//       layout.prepend(navbarLogo); // insert at top
//       console.log("Navbar logo moved to top of sidebar layout.");
//       break;
//     }
//   }
// }

// // Watch for dynamically loaded sidebar
// const observer = new MutationObserver(() => {
//   restructureLayout();
// });

// observer.observe(document.body, {
//   childList: true,
//   subtree: true,
// });

// // Run once on load too
// document.addEventListener("DOMContentLoaded", restructureLayout);



// function restrctureLayout() {
//   const navbarLogo = document.querySelector(".navbar-brand.navbar-home");
//   const sidebarLayout = document.querySelector(".layout-side-section:has(.list-sidebar)");
//   sidebarLayout.appendChild(navbarLogo);
// }

// document.addEventListener("DOMContentLoaded", restrctureLayout);



