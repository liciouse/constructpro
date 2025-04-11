from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import Payment


@login_required
def user_payments_view(request):
    user = request.user
    if user.user_type == 'client':
        payments = Payment.objects.filter(payer=user)
    elif user.user_type == 'contractor':
        payments = Payment.objects.filter(payee=user)
    else:
        payments = Payment.objects.none()

    return render(request, 'get_payments.html', {'payments': payments})