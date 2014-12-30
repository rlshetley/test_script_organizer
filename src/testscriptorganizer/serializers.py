from django.contrib.auth.models import User, Group, Permission
from rest_framework import serializers
from testscriptorganizer import models

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = ('id', 'name')

class TestSuiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TestSuite
        project = serializers.PrimaryKeyRelatedField()
        fields = ('id', 'name', 'project')

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Test
        testSuite = serializers.PrimaryKeyRelatedField()
        fields = ('id', 'name', 'testSuite')

class TestStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TestStep
        test = serializers.PrimaryKeyRelatedField()
        fields = ('id', 'name', 'action', 'expectedResult', 'test', 'description', 'stepNumber')

class TestSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TestSession
        test = serializers.PrimaryKeyRelatedField()
        fields = ('id', 'server', 'browser', 'tester', 'test', 'startDate', 'finishDate')

class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TestResult
        testStep = serializers.PrimaryKeyRelatedField()
        testSession = serializers.PrimaryKeyRelatedField()
        fields = ('id', 'testStep', 'actualResult', 'comments', 'isPassed', 'testSession')

class TestEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TestEvent
        testSuite = serializers.PrimaryKeyRelatedField()
        fields = ('id', 'date', 'testSuite')

class TestEventResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TestEventResult
        testSession = serializers.PrimaryKeyRelatedField()
        testEvent = serializers.PrimaryKeyRelatedField()
        fields = ('id', 'testSession', 'testEvent')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'groups')

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name')
        
class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('code_name', 'name')