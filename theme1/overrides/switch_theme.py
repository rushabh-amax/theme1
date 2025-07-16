import frappe
# from frappe.core.doctype.user.user import switch_theme as original_switch_theme

@frappe.whitelist()
def switch_theme():
    """Override to make healthcare_theme persist"""
    theme_name = "healthcare_theme"  # Must match what your theme is named in `Website Theme`


    frappe.db.set_value("User", frappe.session.user, "desk_theme", theme_name)
    frappe.local.cookie_manager.set_cookie("desk_theme", theme_name)
    frappe.db.commit()


#    /
# import frappe

# def set_default_theme_for_user(bootinfo):
#     theme = frappe.db.get_value("User", frappe.session.user, "theme")
#     if theme:
#         bootinfo["theme"] = theme
 