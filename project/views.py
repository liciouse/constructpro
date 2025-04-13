# views.py
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .forms import ProjectForm, TaskForm
from .models import Project, Task

@login_required
def create_project_with_task(request):
    if request.user.user_type != 'client':
        return render(request, '403.html', status=403)

    if request.method == 'POST':
        project_form = ProjectForm(request.POST)
        task_form = TaskForm(request.POST)

        if project_form.is_valid() and task_form.is_valid():
            project = project_form.save(commit=False)
            project.client = request.user
            project.save()

            task = task_form.save(commit=False)
            task.project = project
            task.status = 'pending'  # explicitly set even if default
            task.save()

            return redirect('client-dashboard')  # or wherever you want
    else:
        project_form = ProjectForm()
        task_form = TaskForm()

    return render(request, 'tasks.html', {
        'project_form': project_form,
        'task_form': task_form,
    })
