# views.py
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .models import Project, Task, User

@login_required
def create_project_and_task_custom(request):
    if request.method == 'POST':
        # Extract project data
        name = request.POST.get('project_name')
        project_type = request.POST.get('project_type')
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('estimated_end_date')
        description = request.POST.get('project_description')
        budget = request.POST.get('budget')
        priority = request.POST.get('priority')

        # Save the project
        project = Project.objects.create(
            name=name,
            project_type=project_type,
            description=description,
            start_date=start_date,
            end_date=end_date,
            client=request.user,
            budget=budget or 0,
            priority=priority
        )

        # Extract task data
        task_name = request.POST.get('task_name')
        task_type = request.POST.get('task_type')
        due_date = request.POST.get('task_due_date')
        task_description = request.POST.get('task_description')
        assign_to_id = request.POST.get('assign_to')

        assigned_user = User.objects.filter(id=assign_to_id, user_type='contractor').first() if assign_to_id else None

        # Save the task
        Task.objects.create(
            project=project,
            title=task_name,
            task_type=task_type,
            due_date=due_date,
            description=task_description,
            assigned_to=assigned_user
        )

        return redirect('client-dashboard')  # Or a success page

    contractors = User.objects.filter(user_type='contractor')
    return render(request, 'tasks.html', {'contractors': contractors})
