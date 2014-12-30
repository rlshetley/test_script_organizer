from django.contrib.auth.models import User, Group, Permission
from django.db import models
from rest_framework import viewsets
from testscriptorganizer import models
from testscriptorganizer import serializers
from testscriptorganizer import filters
from testscriptorganizer import permissions

from django.contrib.auth.models import User
from testscriptorganizer import serializers
from rest_framework import generics

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows projects to be viewed or edited.
    """
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer
    permission_classes = (permissions.IsInRole,)

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
    API endpoint that allows test steps to be viewed or edited.
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

class UserAdminViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

class RoleAdminViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer
    
class PermissionViewSet(viewsets.ModelViewSet) :
    queryset = Permission.objects.all()
    serializer_class = serializers.PermissionSerializer

class TestSuiteByProjectList(generics.ListAPIView):
    serializer_class = serializers.TestSuiteSerializer

    def get_queryset(self):
        """
        Optionally filters TestSuites by Project Id
        """
        queryset = models.TestSuite.objects.all()
        projectId = self.request.QUERY_PARAMS.get('projectId', None)
        if projectId is not None:
            queryset = queryset.filter(project__id=projectId)
        return queryset

class TestEventByProjectList(generics.ListAPIView):
    serializer_class = serializers.TestEventSerializer

    def get_queryset(self):
        """
        Optionally filters TestEvents by Project Id
        """
        queryset = models.TestEvent.objects.all()
        projectId = self.request.QUERY_PARAMS.get('projectId', None)
        if projectId is not None:
            queryset = queryset.filter(project__id=projectId)
        return queryset

class TestEventByTestSuiteList(generics.ListAPIView):
    serializer_class = serializers.TestEventSerializer

    def get_queryset(self):
        """
        Optionally filters TestEvents by TestSuite Id
        """
        queryset = models.TestEvent.objects.all()
        testSuite = self.request.QUERY_PARAMS.get('testSuiteId', None)
        if testSuite is not None:
            queryset = queryset.filter(testSuite__id=testSuiteId)
        return queryset

class TestResultsByTestSessionList(generics.ListAPIView):
    serializer_class = serializers.TestResultSerializer

    def get_queryset(self):
        """
        Optionally filters Test Results by Test Session Id
        """
        queryset = models.TestResult.objects.all()
        testSessionId = self.request.QUERY_PARAMS.get('testSessionId', None)
        if testSessionId is not None:
            queryset = queryset.filter(testSession__id=testSessionId)
        return queryset

class TestsByProjectList(generics.ListAPIView):
    serializer_class = serializers.TestSerializer

    def get_queryset(self):
        """
        Optionally filters Test Results by Test Session Id
        """
        queryset = models.Test.objects.all()
        projectId = self.request.QUERY_PARAMS.get('projectId', None)
        if projectId is not None:
            queryset = queryset.filter(project__id=projectId)
        return queryset

class TestsByTestSuiteList(generics.ListAPIView):
    serializer_class = serializers.TestSerializer

    def get_queryset(self):
        """
        Optionally filters Test Results by Test Session Id
        """
        queryset = models.Test.objects.all()
        testSuiteId = self.request.QUERY_PARAMS.get('testSuiteId', None)
        if testSuiteId is not None:
            queryset = queryset.filter(testSuite__id=testSuiteId)
        return queryset

class TestStepsByTestList(generics.ListAPIView):
    serializer_class = serializers.TestStepSerializer

    def get_queryset(self):
        """
        Optionally filters Test Results by Test Session Id
        """
        queryset = models.TestStep.objects.all()
        testId = self.request.QUERY_PARAMS.get('testId', None)
        if testId is not None:
            queryset = queryset.filter(test__id=testId)
        return queryset