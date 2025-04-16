# urls.py
from django.urls import path
from .views import create_project_and_task_custom, project_progress_view,\
download_project_progress_pdf, user_projects_view, download_project_progress

urlpatterns = [
    path('project/create/tasks/', create_project_and_task_custom, name='create-tasks'),
    path('project/progress/', project_progress_view, name='project_progress'),
    path('download/project/report/', download_project_progress_pdf, name='download_project_progress_pdf'),
    path('my/projects/', user_projects_view, name='user-projects'),
    path('download/reports/', download_project_progress, name='report-projects'),
]
