from setuptools import setup, find_packages

setup(
    name="theme1",
    version="0.0.1",
    description="Theme1 collection app",
    author="rushabh malvaniya",
    author_email="rushabhmalvaniya.amax@email.com",
    license="MIT",
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=("frappe",),
)
