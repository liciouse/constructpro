from django.urls import path
from users.views import index, login_view, client_dashboard, contractor_dashboard

urlpatterns = [
    path('', index, name='index'),
    path('login/', login_view, name='login'),
    path('logout/', login_view, name='logout'),
    path('client/dashboard/',client_dashboard, name='client-dashboard'),
    path('contractor/dashboard/',contractor_dashboard, name='contractor-dashboard')

]