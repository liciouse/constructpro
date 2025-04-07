from django.contrib import admin
from project.models import Project, Task, WorkOrder

admin.site.register(Project)
admin.site.register(Task)
admin.site.register(WorkOrder)

