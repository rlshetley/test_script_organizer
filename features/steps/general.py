from behave import *
from hamcrest import *
import json

@given(u'a {model_type} with properties')
def step_impl(context, model_type):
    model = {}

    for row in context.table:
        model[row['property']] = row['value']

    setattr(context, model_type, model)

@given(u'the {model_type} is created')
@when(u'the {model_type} is created')
def step_impl(context, model_type):
    model = getattr(context, model_type)
    context.response = context.app.post('/projects/', data=json.dumps(model))

@then(u'a message with HTTP code {code} is received')
def step_impl(context, code):
    assert_that(context.response, is_(not_none()))

    assert_that(context.response.status_code, equal_to(int(code)))

@then(u'the {model_type} is in the system')
def step_impl(context, model_type):
    pass

@when(u'the {model_type} is updated with properties')
def step_impl(context, model_type):
    model = getattr(context, model_type)

    for row in context.table:
        model[row['property']] = row['value']

@when(u'the {model_type} is deleted')
def step_impl(context, model_type):
    pass

@then(u'the {model_type} is not in the system')
def step_impl(context, model_type):
    pass
