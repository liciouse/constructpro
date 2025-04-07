from django.db import models
from users.models import User

class Project(models.Model):
    STATUS = (
        ('started', 'Started'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('paused', 'Paused'),
    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    client = models.ForeignKey(
        User, on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'client'},
        null=True, blank=True,
        related_name='projects')
        
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS, 
        default='started') 

    def __str__(self):
        return self.name


class Task(models.Model):
    STATUS_CHOICES = (
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('pending', 'Pending'),
    )
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True, blank=True, 
        limit_choices_to={'user_type': 'contractor'},
        related_name='assigned_tasks')
    start_date = models.DateField()
    due_date = models.DateField()
    status = models.CharField(
        max_length=16,
        choices=STATUS_CHOICES,
        default='pending',
    
        )  # Not Started, In Progress, Done

    def __str__(self):
        return f'{self.title}  assigned to {self.assigned_to}'
    

class WorkOrder(models.Model):
    STATUS_CHOICES = (
        ('issued', 'Issued'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('paused', 'Paused'),
    )

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    subcontractor = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'sub_contractor'},
        related_name='work_orders',
        null=True, blank=True)
    description = models.TextField()
    start_date = models.DateField()
    due_date = models.DateField()
    status = models.CharField(
        max_length=14, 
        choices=STATUS_CHOICES,
        default='issued',
        blank=True, null=True
        ) 

    def __str__(self):
        return f"Work Order for {self.subcontractor} - {self.project.name}"



