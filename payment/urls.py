from django.urls import path
from payment.views import user_payments_view

urlpatterns = [
    path('get/user/payments/', user_payments_view, name='get-user-payments'),
]