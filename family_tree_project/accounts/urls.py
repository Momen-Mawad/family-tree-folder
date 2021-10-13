from django.urls import re_path, path
from . import views

app_name = 'accounts'

urlpatterns = [
    re_path(r'^login/', views.LogIn.as_view(), name='login_page'),
    re_path(r'^', views.LogOut.as_view(), name='logout_page'),
    re_path(r'^signup/', views.SignUp.as_view(), name='signup_page'),

]