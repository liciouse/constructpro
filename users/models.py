from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    PLAN_CHOICES = (
        ('basic', 'Basic'),
        ('premium', 'Premium'),
    )

    USER_TYPES_CHOICES = (
        ('contractor', 'Contractor'),
        ('client', 'Client'),
    )

    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=12, choices=USER_TYPES_CHOICES, default='client')
    plan = models.CharField(max_length=10, choices=PLAN_CHOICES, default='basic')
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f' {self.id}  - {self.username}'