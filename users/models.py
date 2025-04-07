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
        ('sub_contractor', 'Sub Contractor'),
    )

    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=16, choices=USER_TYPES_CHOICES, default='client')
    plan = models.CharField(max_length=10, choices=PLAN_CHOICES, default='basic')
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f' {self.id}  - {self.username}'
    

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    national_id = models.CharField(max_length=20, null=True, blank=True)
    company_name = models.CharField(max_length=100, blank=True)
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)
    specialty = models.CharField(max_length=100, null=True, blank=True)
    license_number = models.CharField(max_length=100, blank=True)


    def __str__(self):
        return f"{self.user.get_full_name()}'s profile"
