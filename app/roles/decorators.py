from functools import wraps

from app.roles.models import Role

class Authorized_Roles(object):
    """
    A decorator to check if a user is authorized to use a method
    """
    auth_role = ''
    def __init__(self, role):
        self.auth_role = role

    def __call__(self, fn):
        @wraps(fn)
        def decorated_function(*args, **kwargs):
            if g.user is None:
                "Return HTTP code for login"
                return

            if not any(x for x in user.roles if x.name == auth_role):
                'Not authorized'
                return

            return f(*args, **kwargs)
        return decorated_function
