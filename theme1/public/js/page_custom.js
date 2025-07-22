function waitForSidebarAndRemoveColClass() {
  const sidebar = document.querySelector(".layout-side-section");

  if (!sidebar) {
    // Retry until sidebar is available
    setTimeout(waitForSidebarAndRemoveColClass, 100);
    return;
  }

  // Confirm it's there and remove
  if (sidebar.classList.contains("col-lg-2")) {
    sidebar.classList.remove("col-lg-2");
    console.log("Removed col-lg-2 from sidebar");
  } else {
    console.log("Sidebar doesn't have col-lg-2");
  }
}

document.addEventListener("DOMContentLoaded", waitForSidebarAndRemoveColClass);




function initSidebarToggleButton() {
  const sidebar = document.querySelector(".layout-side-section");
  const pageHead = document.querySelector(".page-head-content");

  if (!sidebar || !pageHead) {
    // Retry if elements are not loaded yet
    setTimeout(initSidebarToggleButton, 200);
    return;
  }

  // Create the toggle button
  const toggleButton = document.createElement("button");
  toggleButton.innerHTML = "☰";
  toggleButton.className = "btn btn-outline-secondary btn-sm me-2"; // Bootstrap styles
  toggleButton.title = "Toggle Sidebar";

  // Insert it at the beginning of page-head-content
  pageHead.prepend(toggleButton);

  // Track state
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
function collapseSidebar(sidebar) {
  sidebar.classList.add("w-60px" , "px-2");
  sidebar.classList.remove("col-lg-2", "col-md-3");

  document.querySelectorAll(".standard-sidebar-item .sidebar-item-label").forEach(el => {
    el.classList.add("d-none");
  });
  document.querySelectorAll(".sidebar-item-icon .icon").forEach(el => {
    el.style.transform = "scale(1.15)";
    el.classList.add("ml-3")
    el.classList.remove("icon-md")
    el.classList.add("icon-lg")

    el.style.transition = "transform 0.2s ease";
  });

  
  document.querySelectorAll("data-page-route=Workspaces] .standard-sidebar-item .item-anchor ").forEach(el => {
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
  })

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

