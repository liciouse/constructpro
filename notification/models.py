from django.db import models
from users.models import User


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    subject = models.CharField(max_length=200)
    body = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.sender.username} -> {self.recipient.username}'
    
class ChatSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    conversation = models.JSONField(default=list)
    created_at = models. DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'ChatSession {self.id}- {self.user.username}'

