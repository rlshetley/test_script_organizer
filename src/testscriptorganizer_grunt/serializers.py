from django.contrib.auth.models import User, Group
from rest_framework import serializers
from testscriptorganizer import models

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Project
        fields = ('id', 'name')

class TestSuiteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.TestSuite
        fields = ('id', 'name', 'project')

class TestSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Test
        fields = ('id', 'name', 'testSuite')

class TestStepSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.TestStep
        fields = ('id', 'name', 'action', 'expectedResult', 'test', 'description', 'stepNumber')

class TestSessionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.TestSession
        fields = ('id', 'server', 'browser', 'tester', 'test', 'startDate', 'finishDate')

class TestResultSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.TestResult
        fields = ('id', 'testStep', 'actualResult', 'comments', 'isPassed', 'testSession')

class TestEventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.TestEvent
        fields = ('id', 'date', 'testSuite')

class TestEventResultSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.TestEventResult
        fields = ('id', 'testSession', 'testEvent')

from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    snippets = serializers.PrimaryKeyRelatedField(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email')