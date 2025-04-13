from django import forms
from .models import Project, Task, User

class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['name', 'description', 'start_date', 'end_date']

        widgets = {
            'start_date': forms.DateTimeInput(attrs={'type': 'date'}),
            'end_date':forms.DateTimeInput(attrs={'type': 'date'}),
        }


class TaskForm(forms.ModelForm):
    assigned_to = forms.ModelChoiceField(
        queryset=User.objects.filter(user_type='contractor'),
        required=False,
        label="Assign to Contractor"
    )

    class Meta:
        model = Task
        fields = ['title', 'description', 'assigned_to', 'start_date', 'due_date']

        widgets = {
            'start_date': forms.DateTimeInput(attrs={'type': 'date'}),
            'due_date':forms.DateTimeInput(attrs={'type': 'date'}),
        }
