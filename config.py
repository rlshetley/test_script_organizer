# Define the application directory
import os

class Config(object):
    
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    
    SQLALCHEMY_DATABASE_URI = 'mysql://rlshetley@127.0.0.1:3306/c9'
    DATABASE_CONNECT_OPTIONS = {}
    
    THREADS_PER_PAGE = 2
    
    CSRF_ENABLED     = True
    
    CSRF_SESSION_KEY = "secret"
    
    SECRET_KEY = "secret"
    
class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(Config.BASE_DIR, 'app.db')
