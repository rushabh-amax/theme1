const observer = new MutationObserver(() => {
  const img = document.querySelector('.msg-box img[alt="Generic Empty State"]');

  if (img) {
    console.log('🖼️ Target image found — replacing with our image');

    // Remove old image
    const parent = img.parentNode;
    img.remove();

    // Create new image
    const newImg = document.createElement('img');
    newImg.src = 'https://cdn.dribbble.com/userupload/17090601/file/original-3bb1adf404d69287479b6be83d173624.jpg?resize=752x752&vertical=center';
    newImg.alt = 'Custom Empty State';
    newImg.style.width = '300px';
    newImg.style.height = 'auto';
    newImg.style.borderRadius = '8px';
    newImg.style.objectFit = 'cover';

    // Insert new image
    parent.appendChild(newImg);

    console.log('✅ Replaced with custom image and stopped observer');
    observer.disconnect();
  }
});

// Start observing the DOM for changes
observer.observe(document.body, { childList: true, subtree: true });





// Run on initial page load
document.addEventListener("DOMContentLoaded", function () {
  updateAppLogo();

  // Observe DOM changes to re-apply logo if replaced dynamically
  const observer = new MutationObserver(() => {
    updateAppLogo();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

function updateAppLogo() {
  const appLogo = document.querySelector(".app-logo");

  if (appLogo && !appLogo.dataset.customized) {
    appLogo.src = "https://www.vasanipolymers.com/wp-content/uploads/2024/05/VASANI-Logo-1024x287.png";
    appLogo.style.height = "auto";
    appLogo.style.maxHeight = "40px";
    appLogo.dataset.customized = "true"; // prevent re-applying
  }
}



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
  toggleButton.className = "custom-sidebar-toggle";
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
    // source.classList.add("py-2")

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





// function removePageTItles(){
//   const  pageTitle = document.querySelector(".page-title");
//     // Start observing changes in the body subtree
//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//   });

// }
// document.addEventListener("DOMContentLoaded", movePageHeadContent);
