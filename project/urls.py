# urls.py
from django.urls import path
from .views import create_project_with_task

urlpatterns = [
    path('project/create/tasks/', create_project_with_task, name='create-tasks'),
]
