from django.conf.urls import patterns, include, url

from rest_framework import routers

from testscriptorganizer import viewsets

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'projects', viewsets.ProjectViewSet)
router.register(r'testsuites', viewsets.TestSuiteViewSet)
router.register(r'tests', viewsets.TestViewSet)
router.register(r'testsessions', viewsets.TestSessionViewSet)
router.register(r'teststeps', viewsets.TestStepViewSet)
router.register(r'testresults', viewsets.TestResultViewSet)
router.register(r'testevents', viewsets.TestEventViewSet)
router.register(r'testeventResults', viewsets.TestEventResultViewSet)
router.register(r'users', viewsets.UserAdminViewSet)
router.register(r'roles', viewsets.RoleAdminViewSet)
router.register(r'permissions', viewsets.PermissionViewSet)

urlpatterns = patterns('',
    url(r'^api/', include(router.urls)),
    url(r'^api-token-auth/', 'rest_framework.authtoken.views.obtain_auth_token'),
    url(r'^$', 'testscriptorganizer.views.home', name="home"),
    url('^api/testsuitesbyproject', viewsets.TestSuiteByProjectList.as_view()),
    url('^api/testEventsbyproject', viewsets.TestEventByProjectList.as_view()),
    url('^api/testEventsbytestsuite', viewsets.TestEventByTestSuiteList.as_view()),
    url('^api/testresultsbysession', viewsets.TestResultsByTestSessionList.as_view()),
    url('^api/testsbyproject', viewsets.TestsByProjectList.as_view()),
    url('^api/testsbytestsuite', viewsets.TestsByTestSuiteList.as_view()),
    url('^api/teststepsbytest', viewsets.TestStepsByTestList.as_view()),
)
