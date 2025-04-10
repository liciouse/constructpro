from django.db import models
from project.models import Project

class Material(models.Model):
    name = models.CharField(max_length=100)
    unit = models.CharField(max_length=20)  # e.g., kg, piece
    unit_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class ProjectMaterial(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    delivered_on = models.DateField()

    def total_cost(self):
        return self.quantity * self.material.unit_cost
