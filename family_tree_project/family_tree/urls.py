from django.urls import path, re_path
from rest_framework import routers
from . import views
from django.urls import include

router = routers.DefaultRouter()
router.register(r'family', views.FamilyView)
router.register(r'person', views.PersonView)
router.register(r'child', views.ChildView)
router.register(r'user', views.UserView)
urlpatterns = router.urls


# urlpatterns = [
#     re_path(r'^', include(router.urls)),
#     path('account/register', views.UserView.as_view()),
#     path('create_prson', views.PersonView.as_view()),
#     path('families', views.FamilyView.as_view()),
#
# ]
