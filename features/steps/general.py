from behave import *
from hamcrest import *
import json


@given(u'a url "{url}"')
def step_impl(context, url):
    context.scenario.url = url


@given(u'a {model_type} with properties')
def step_impl(context, model_type):
    model = {}

    context.scenario.properties = context.table

    for row in context.table:
        model[row['property']] = row['value']

    setattr(context.scenario, model_type, model)

@given(u'the {model_type} is created')
@when(u'the {model_type} is created')
def step_impl(context, model_type):
    model = getattr(context.scenario, model_type)
    context.scenario.response = context.app.post(context.scenario.url, data=json.dumps(model))

    response_data = json.loads(context.scenario.response.get_data(as_text=True))

    setattr(context.scenario.response, model_type, response_data)

@then(u'a message with HTTP code {http_code} is received')
def step_impl(context, http_code):
    assert_that(context.scenario.response, is_(not_none()))

    assert_that(context.scenario.response.status_code, equal_to(int(http_code)))

@then(u'the {model_type} is in the system')
def step_impl(context, model_type):
    http_code = 200

    response_data = getattr(context.scenario.response, model_type)

    data_id = response_data['id']

    context.scenario.response = context.app.get('%s%d/' % (context.scenario.url, data_id))

    assert_that(context.scenario.response, is_(not_none()))

    assert_that(context.scenario.response.status_code, equal_to(int(http_code)))

    result = json.loads(context.scenario.response.get_data(as_text=True))

    assert_that(result['id'], greater_than(0))

    for row in context.scenario.properties:
        assert_that(result[row['property']], equal_to(row['value']))

@when(u'the {model_type} {property} is updated with {value}')
def step_impl(context, model_type, property, value):
    model = getattr(context.scenario, model_type)

    response_data = getattr(context.scenario.response, model_type)

    response_data[property] = value

    data_id = response_data['id']

    context.scenario.response = context.app.put('%s%d/' % (context.scenario.url, data_id), data=json.dumps(response_data))

    response_data = json.loads(context.scenario.response.get_data(as_text=True))

    setattr(context.scenario.response, model_type, response_data)

@when(u'the {model_type} is deleted')
def step_impl(context, model_type):

    response_data = getattr(context.scenario.response, model_type)

    data_id = response_data['id']

    context.scenario.response = context.app.delete('%s%d/' % (context.scenario.url, data_id))

    setattr(context.scenario.response, model_type, response_data)

@then(u'the {model_type} is not in the system')
def step_impl(context, model_type):
    http_code = 404

    response_data = getattr(context.scenario.response, model_type)

    data_id = response_data['id']

    context.scenario.response = context.app.get('%s%d/' % (context.scenario.url, data_id))

    assert_that(context.scenario.response, is_(not_none()))

    assert_that(context.scenario.response.status_code, equal_to(int(http_code)))


@given(u'a {model_type} with a {rel_type} relationship using {relationship_id}')
def step_impl(context, model_type, rel_type, relationship_id):
    model = getattr(context.scenario, model_type)

    rel = context.feature.defaults[rel_type]

    model[relationship_id] = rel

@when(u'the {model_type} resource is queried with {query_string} set to a {default_id_type}')
def step_impl(context, model_type, query_string, default_id_type):

    query_param = context.feature.defaults[default_id_type]

    context.scenario.response = context.app.get('%s?%s=%d' % (context.scenario.url, query_string, query_param))

@then(u'the results contain the {model_type}')
def step_impl(context, model_type):
    assert_that(context.scenario.response, is_(not_none()))

    result = json.loads(context.scenario.response.get_data(as_text=True))
