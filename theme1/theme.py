# import frappe

# def set_default_theme_for_user(bootinfo):
#     user = frappe.session.user
#     if not user:
#         return

#     # Set theme for current session
#     bootinfo["theme"] = "healthcare_theme"

#     # Set user default (stored in tabDefaultValue)
#     frappe.defaults.set_user_default(user, "theme", "healthcare_theme")
