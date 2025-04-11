from django.urls import path
from users.views import index, login_view, client_dashboard

urlpatterns = [
    path('', index, name='index'),
    path('login/', login_view, name='login'),
    path('client/dashboard/',client_dashboard, name='client-dashboard')
]