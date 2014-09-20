from django.conf.urls import patterns, include, url
from rest_framework import routers
from testscriptorganizer import viewsets

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'projects', viewsets.ProjectViewSet)
router.register(r'testsuites', viewsets.TestSuiteViewSet)
router.register(r'tests', viewsets.TestViewSet)

urlpatterns = patterns('',
    url(r'^api/', include(router.urls)),
    url(r'^api-token-auth/', 'rest_framework.authtoken.views.obtain_auth_token'),
    url(r'^$', 'testscriptorganizer.views.home', name="home")
)
