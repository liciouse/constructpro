from django.db import models
from users.models import User


class Project(models.Model):
    STATUS = (
        ('started', 'Started'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('paused', 'Paused'),
    )
    PRIORITY = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    )
    TYPE_CHOICES = (
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('industrial', 'Industrial'),
        ('renovation', 'Renovation'),
    )

    name = models.CharField(max_length=100,null=True, blank=True)
    project_type = models.CharField(max_length=20, choices=TYPE_CHOICES,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    budget = models.FloatField(null=True, blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY, default='medium')
    client = models.ForeignKey(
        User, on_delete=models.CASCADE,
        null=True, blank=True,
        limit_choices_to={'user_type': 'client'})
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS, default='started')
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Task(models.Model):
    STATUS_CHOICES = (
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('pending', 'Pending'),
    )
    TYPE_CHOICES = (
        ('planning', 'Planning'),
        ('design', 'Design'),
        ('construction', 'Construction'),
        ('inspection', 'Inspection'),
        ('finalization', 'Finalization'),
    )

    project = models.ForeignKey(Project, on_delete=models.CASCADE,null=True, blank=True)
    title = models.CharField(max_length=100,null=True, blank=True)
    task_type = models.CharField(max_length=20, choices=TYPE_CHOICES, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,
                                    limit_choices_to={'user_type': 'contractor'})
    start_date = models.DateField(null=True, blank=True)
    due_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f'{self.title} for {self.project}'

    

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



