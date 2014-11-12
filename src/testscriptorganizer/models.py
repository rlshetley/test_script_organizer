from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=255)

class TestSuite(models.Model):
    name = models.CharField(max_length=255)
    project = models.ForeignKey(Project)

class Test(models.Model):
    name = models.CharField(max_length=255) 
    testSuite = models.ForeignKey(TestSuite)

class TestStep(models.Model):
    name = models.CharField(max_length=255) 
    action = models.CharField(max_length=255) 
    expectedResult = models.CharField(max_length=255) 
    description = models.CharField(max_length=255) 
    stepNumber = models.SmallIntegerField()
    test = models.ForeignKey(Test)

class TestSession(models.Model):
    server = models.CharField(max_length=255) 
    browser = models.CharField(max_length=255) 
    tester = models.CharField(max_length=255) 
    test = models.ForeignKey(TestSuite)
    startDate = models.DateTimeField()
    finishDate = models.DateTimeField()

class TestResult(models.Model):
    testStep = models.ForeignKey(TestStep)
    actualResult = models.CharField(max_length=255)
    comments = models.CharField(max_length=255)
    testSession = models.ForeignKey(TestSession)
    isPass = models.BooleanField(default=False)

class TestEvent(models.Model):
    name = models.CharField(max_length=255) 
    date = models.DateTimeField()
    testSuite = models.ForeignKey(TestSuite)
    project = models.ForeignKey(Project)

class TestEventResult(models.Model):
    testSession = models.ForeignKey(TestSession)
    testEvent = models.ForeignKey(TestEvent) 