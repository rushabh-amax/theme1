# theme1/config/desktop.py
from frappe import _

def get_data():
    return [
        {
            "module_name": "Theme1",
            "color": "#589494",
            "icon": "octicon octicon-file-directory",
            "type": "module",
            "label": _("Theme1")
        },
        {
            "label": _("Morden Desk"),
            "icon": "fa fa-star",
            "type": "page",
            "name": "morden-menu"
        }
    ]
