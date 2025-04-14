# views.py
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .forms import MessageForm

@login_required(login_url='/login/')
def send_message(request):
    if request.method == 'POST':
        form = MessageForm(request.POST, user=request.user)
        if form.is_valid():
            message = form.save(commit=False)
            message.sender = request.user
            message.save()

            # Redirect based on user type
            user_type = request.user.user_type
            if user_type == 'client':
                return redirect('client-dashboard')
            elif user_type == 'contractor':
                return redirect('contractor-dashboard')
            elif user_type == 'admin':
                return redirect('admin-dashboard')  # Optional
            else:
                return redirect('index')  # Fallback

    else:
        form = MessageForm(user=request.user)

    return render(request, 'send_message.html', {'form': form})
