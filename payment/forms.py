# forms.py
from django import forms
from .models import Payment, Project

class PaymentForm(forms.ModelForm):
    class Meta:
        model = Payment
        fields = ['project', 'amount', 'payment_date', 'method']
        widgets = {
            'payment_date': forms.DateInput(attrs={'type': 'date'}),
        }

    def __init__(self, *args, **kwargs):
        client = kwargs.pop('client', None)
        super().__init__(*args, **kwargs)
        if client:
            self.fields['project'].queryset = Project.objects.filter(client=client, is_paid=False)

