from django.urls import path, include
from . import views
from rest_framework.routers import BaseRouter, DefaultRouter


router = DefaultRouter()
router.register('categories', views.CategoryViewSet, basename='category')
router.register('courses', views.CourseViewSet, basename='course')
router.register('lessons', views.LessonViewSet, basename='lesson')
router.register('users', views.Us, basename='lesson')


urlpatterns = [
    path('', include(router.urls)),
]