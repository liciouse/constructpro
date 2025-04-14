# urls.py
from django.urls import path
from .views import create_project_and_task_custom, project_progress_view

urlpatterns = [
    path('project/create/tasks/', create_project_and_task_custom, name='create-tasks'),
    path('project/progress/', project_progress_view, name='project_progress'),
]
