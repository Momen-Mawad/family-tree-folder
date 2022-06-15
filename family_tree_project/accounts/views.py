from django.urls import reverse_lazy, reverse
from django.views.generic import CreateView
from django.contrib.auth.views import LoginView, LogoutView

import os
# Create your views here.


class SignUp(CreateView):
    template_name = os.path.join('accounts', 'signup_page.html')
    success_url = reverse_lazy('accounts:login_page')


class LogIn(LoginView):
    template_name = os.path.join('accounts', 'login_page.html')
    #next = 'family_tree/tree_list'


class LogOut(LogoutView):
    next_page = '/'





