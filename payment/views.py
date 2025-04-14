from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .models import Payment, Project
from .forms import PaymentForm
from django.utils import timezone
from django.db.models import Count

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

@login_required(login_url='/login/')
def make_payment(request):
    if request.user.user_type != 'client':
        return render(request, '403.html', status=403)

    if request.method == 'POST':
        form = PaymentForm(request.POST, client=request.user)
        if form.is_valid():
            payment = form.save(commit=False)
            payment.payer = request.user
            payment.payee = payment.project.client  # or fetch associated contractor
            payment.save()

            # Mark project as paid
            project = payment.project
            project.is_paid = True
            project.save()

            return redirect('client-dashboard')  # or any confirmation view
    else:
        form = PaymentForm(client=request.user)

    return render(request, 'make_payment.html', {'form': form})


@login_required(login_url='/login/')
def client_dashboard(request):
    # Project progress
    projects = Project.objects.filter(client=request.user)
    status_data = list(projects.values('status').annotate(count=Count('id')))
    priority_data = list(projects.values('priority').annotate(count=Count('id')))
    payments = Payment.objects.filter(payer=request.user)
    payment_data = list(payments.values('method').annotate(count=Count('id')))

    return render(request, 'client_dashboard.html', {
        'status_data': status_data,
        'priority_data': priority_data,
        'payment_data': payment_data,
    })