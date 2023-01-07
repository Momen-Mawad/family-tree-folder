from django.urls import path, re_path
from rest_framework import routers
from .views import *
from django.urls import include

# router = routers.DefaultRouter()
# router.register(r'family', FamilyView)
# router.register(r'person', PersonView)
# router.register(r'update_person', UpdatePersonView)
# urlpatterns = router.urls

urlpatterns = [
    re_path('person', PersonView.as_view({'get': 'list'})),
    re_path('get_families', GetFamiliesView.as_view({'get': 'list'})),
]
