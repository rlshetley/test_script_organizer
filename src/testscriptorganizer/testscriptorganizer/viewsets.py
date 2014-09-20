from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from testscriptorganizer import models
from testscriptorganizer import serializers
from testscriptorganizer import filters
from rest_framework import permissions
from django.contrib.auth.models import User
from testscriptorganizer import serializers

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows projects to be viewed or edited.
    """
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer

class TestSuiteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows test suites to be viewed or edited.
    """
    queryset = models.TestSuite.objects.all()
    serializer_class = serializers.TestSuiteSerializer
    filter_class = filters.TestSuiteFilter

class TestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tests to be viewed or edited.
    """
    queryset = models.Test.objects.all()
    serializer_class = serializers.TestSerializer
    filter_class = filters.TestFilter

class TestStepViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows test stepss to be viewed or edited.
    """
    queryset = models.TestStep.objects.all()
    serializer_class = serializers.TestStepSerializer
    filter_class = filters.TestStepFilter

class TestSessionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows test sessions to be viewed or edited.
    """
    queryset = models.TestSession.objects.all()
    serializer_class = serializers.TestSessionSerializer
    filter_class = filters.TestSessionFilter

class TestResultViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows test results to be viewed or edited.
    """
    queryset = models.TestResult.objects.all()
    serializer_class = serializers.TestResultSerializer
    filter_class = filters.TestResultFilter

class TestEventViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows test events to be viewed or edited.
    """
    queryset = models.TestEvent.objects.all()
    serializer_class = serializers.TestEventSerializer
    filter_class = filters.TestEventFilter

class TestEventResultViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows test event results to be viewed or edited.
    """
    queryset = models.TestEventResult.objects.all()
    serializer_class = serializers.TestEventResultSerializer
    filter_class = filters.TestEventResultFilter