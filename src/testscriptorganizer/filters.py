import django_filters

from rest_framework import filters

from testscriptorganizer import models

class TestSuiteFilter(django_filters.FilterSet):
    project = django_filters.CharFilter(name="project__id")

    class Meta:
        model = models.TestSuite
        fields = ['project']

class TestFilter(django_filters.FilterSet):
    testSuite = django_filters.CharFilter(name="testSuite__id")

    class Meta:
        model = models.Test
        fields = ['testSuite']

class TestStepFilter(django_filters.FilterSet):
    test = django_filters.CharFilter(name="test__id")

    class Meta:
        model = models.TestStep
        fields = ['test']

class TestSessionFilter(django_filters.FilterSet):
    test = django_filters.CharFilter(name="test__id")

    class Meta:
        model = models.TestSession
        fields = ['test']

class TestResultFilter(django_filters.FilterSet):
    testSession = django_filters.CharFilter(name="testSession__id")
    testStep = django_filters.CharFilter(name="testStep__id")

    class Meta:
        model = models.TestResult
        fields = ['testSession', 'testStep']

class TestEventFilter(django_filters.FilterSet):
    testSuite = django_filters.CharFilter(name="testSuite__id")

    class Meta:
        model = models.TestEvent
        fields = ['testSuite']

class TestEventResultFilter(django_filters.FilterSet):
    testSession = django_filters.CharFilter(name="testSession__id")
    testEvent = django_filters.CharFilter(name="testEvent__id")

    class Meta:
        model = models.TestEventResult
        fields = ['testSession', 'testEvent']
