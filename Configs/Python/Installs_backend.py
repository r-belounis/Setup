import pip

_all_ = [
    "flask",
    "flask-cors",
    "Flask-Caching",
    "pymongo[srv]",
    "python-jose",
    "pytz",
    "xlrd==1.2.0",
    "gunicorn",
    "python-dotenv",
    "flask-mongoengine",
    "requests",
    "pandas",
    "sentry-sdk[flask]",
]

windows = ["py2neo==4.2.0",]

linux = ["py2neo",]

darwin = []

def install(packages):
    for package in packages:
        pip.main(['install', package])

if __name__ == '__main__':

    from sys import platform

    install(_all_) 
    if platform == 'win32':
        install(windows)
    if platform.startswith('linux'):
        install(linux)
    if platform == 'darwin': # MacOS
        install(darwin)