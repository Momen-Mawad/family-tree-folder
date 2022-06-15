"""family_tree_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.urls import include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.Index.as_view(), name='index'),
    re_path(r'^', include(('family_tree.urls', 'family_tree'), namespace='family_tree')),
    re_path(r'^accounts/', include('accounts.urls', namespace='accounts')),
    re_path(r'^', include('django.contrib.auth.urls')),
    re_path(r'^test', views.TestPage.as_view(), name='test_page'),
    re_path(r'^contact', views.ContactPage.as_view(), name='contact_page'),
    re_path(r'^about', views.AboutPage.as_view(), name='about_page'),

]
