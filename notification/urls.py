from django.urls import path
from .views import send_message, chat_box_area_view,chat_completion,get_chat_history, premium

urlpatterns = [
    path('send/message/', send_message, name='send-message'),
    path("chat/", chat_box_area_view, name="chat"),
    path("askme/", chat_completion, name="askme"),
    path("chat/history/", get_chat_history, name="chat_history"),
    path("premium/", premium, name="premium"),
]
