from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.db.models import Count
from django.contrib import messages
from project.models import Project

def index(request):
    return render(request, 'index.html')


def index(request):
    return render(request, 'index.html')

@login_required(login_url='/login/')
def client_dashboard(request):
    projects = Project.objects.filter(client=request.user)

    status_data = list(projects.values('status').annotate(count=Count('id')))
    priority_data = list(projects.values('priority').annotate(count=Count('id')))

    return render(request, 'client_dashboard.html', {
        'status_data': status_data,
        'priority_data': priority_data
    })

def contractor_dashboard(request):
    return render(request,'contractor_dashboard.html')


def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            # Redirect based on user type
            if user.user_type == "contractor":
                return redirect("contractor-dashboard")
            elif user.user_type == "client":  
                return redirect("client-dashboard")
            elif user.user_type == "sub_contractor":  
                return redirect("sub_contractor-dashboard")
            elif user.is_superuser:
                return redirect("admin-dashboard")
            else:
                messages.error(request, "Unauthorized access")
                return render(request, '/admin')  

        else:
            messages.error(request, "Invalid username or password")

    return render(request, "login.html")

