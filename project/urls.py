# urls.py
from django.urls import path
from .views import create_project_and_task_custom

urlpatterns = [
    path('project/create/tasks/', create_project_and_task_custom, name='create-tasks'),
]
