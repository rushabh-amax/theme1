frappe.listview_settings['File'] = {
  onload: function (listview) {
    console.log("📂 Custom File listview loaded");

    const observer = new MutationObserver((mutations, obs) => {
      const listSection = document.querySelector(".layout-main-section");
      if (!listSection) return;

      // Stop observer once target is found
      obs.disconnect();

      // --- Create Tree UI
      const explorer = document.createElement("div");
      explorer.id = "folder-tree";
      explorer.style = "min-width: 250px; border-right: 1px solid #eee; padding: 10px; overflow-y:auto;";

      const container = document.createElement("div");
      container.style = "display: flex; height: 100%;";
      listSection.parentNode.insertBefore(container, listSection);
      listSection.parentNode.removeChild(listSection);

      container.appendChild(explorer);
      container.appendChild(listSection);

      // --- Load folder structure
      frappe.call({
        method: "frappe.client.get_list",
        args: {
          doctype: "File",
          fields: ["name", "file_name", "is_folder", "folder"],
          filters: [["is_folder", "=", 1]],
          limit_page_length: 100
        },
        callback: function (r) {
          const folders = r.message;
          const parentMap = {};

          folders.forEach(f => {
            if (!parentMap[f.folder]) parentMap[f.folder] = [];
            parentMap[f.folder].push(f);
          });

          function renderTree(folder = "Home") {
            if (!parentMap[folder]) return '';
            let tree = `<ul>`;
            parentMap[folder].forEach(child => {
              tree += `<li data-folder="${child.name}">${child.file_name}`;
              tree += renderTree(child.name);
              tree += `</li>`;
            });
            tree += `</ul>`;
            return tree;
          }

          explorer.innerHTML = `<strong>📁 Folders</strong>${renderTree()}`;

          // --- Folder click handler
          explorer.querySelectorAll("li").forEach(li => {
            li.style.cursor = "pointer";
            li.onclick = function (e) {
              e.stopPropagation();
              const folderName = li.dataset.folder;
              console.log("📁 Folder clicked:", folderName);

              listview.filter_area.clear();
              listview.filter_area.add([
                ["File", "folder", "=", folderName],
                ["File", "is_folder", "!=", 1]
              ]);
              listview.run();
            };
          });
        }
      });
    });

    // Start observing the layout
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
};
