from django.urls import path
from payment.views import user_payments_view, make_payment

urlpatterns = [
    path('get/user/payments/', user_payments_view, name='get-user-payments'),
    path('make/payment/', make_payment, name='make-payment'),
]