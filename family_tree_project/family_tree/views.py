from rest_framework import viewsets
from .models import Person, Family
from .serializers import FamilySerializer, PersonSerializer

from django.contrib.auth import get_user_model
from rest_framework import permissions

User = get_user_model()


class FamilyView(viewsets.ModelViewSet):
    serializer_class = FamilySerializer
    queryset = Family.objects.all()


class PersonView(viewsets.ModelViewSet):
    serializer_class = PersonSerializer
    queryset = Person.objects.all()
