from django.urls import path
from users.views import index, login_view, client_dashboard

urlpatterns = [
    path('', index, name='index'),
    path('login/', login_view, name='login'),
    path('logout/', login_view, name='logout'),
    path('client/dashboard/',client_dashboard, name='client-dashboard')
]