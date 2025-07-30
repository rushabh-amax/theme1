from setuptools import setup, find_packages

setup(
    name='theme1',
    version='0.0.1',
    description='Custom ERPNext theme by Rushabh',
    author='Rushabh Malvaniya',
    author_email='rushabhmalvaniya.amax@email.com',
    license='MIT',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=['frappe'],
)
