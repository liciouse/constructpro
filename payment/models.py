from django.db import models# Create your models here.
from project.models import Project
from users.models import User



class Payment(models.Model):
    PAYMENT_METHOD = (
        ('mpesa', 'M-pesa'),
        ('bank', 'Bank'),
        ('cash', 'Cash'),
    )

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    payer = models.ForeignKey(
        User, on_delete=models.CASCADE,
        limit_choices_to= {'user_type': 'client'}, 
        null=True, blank=True,
        related_name='payments_made')
    payee = models.ForeignKey(
        User, on_delete=models.CASCADE,
        limit_choices_to= {'user_type': 'contractor'},
        null=True, blank=True,
        related_name='payments_received')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date = models.DateField()
    method = models.CharField(max_length=7, choices=PAYMENT_METHOD, default='mpesa')  # e.g., M-Pesa, Bank, Cash

    def __str__(self):
        return f"{self.amount} from {self.payer} to {self.payee}"

