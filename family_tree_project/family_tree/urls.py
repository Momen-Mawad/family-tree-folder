from django.urls import path, re_path
from . import views

urlpatterns = [
    #re_path(r'^tree_page/(?P<username>[-\w]+)/$', views.TreePage.as_view(), name='tree_page'),
    #re_path(r'^tree_list/(?P<username>[-\w]+)/$', views.TreeList.as_view(), name='tree_list'),
    path('tree_page/', views.TreePage.as_view(), name='tree_page'),
    path('tree_list/', views.TreeList.as_view(), name='tree_list'),

]