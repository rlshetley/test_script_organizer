from behave import *

@given(u'Given a {model}  with properties')
def step_impl(context, model_type):
    pass

@given(u'the {model_type} is created')
@when(u'the {model_type} is created')
def step_impl(context, model_type):
    pass

@then(u'a message with HTTP code {code} is received')
def step_impl(context, code):
    pass

@then(u'the {model_type} is in the system')
def step_impl(context, modeltype):
    pass

@when(u'the {model_type} is updated with properties')
def step_impl(context, model_type):
    pass

@when(u'the {model_type} is deleted)
def step_impl(context, model_type):
    pass
