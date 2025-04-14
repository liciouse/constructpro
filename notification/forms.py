# forms.py
from django import forms
from .models import Message, User

class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['recipient', 'subject', 'body']
        widgets = {
            'body': forms.Textarea(attrs={'rows': 4}),
        }

    def __init__(self, *args, **kwargs):
        current_user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        if current_user:
            self.fields['recipient'].queryset = User.objects.exclude(id=current_user.id)
