from django.urls import path
from .views import *
from rest_framework import routers

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('authenticated', CheckAuthenticatedView.as_view()),
    path('register', SignupView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('delete', DeleteAccountView.as_view()),
    path('csrf_cookie', GetCSRFToken.as_view()),
    path('get_users', GetUsersView.as_view())
]


