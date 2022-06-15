from rest_framework import viewsets
from .models import Person, Family, Child
from .serializers import FamilySerializer, UserSerializer, PersonSerializer, ChildSerializer

from django.contrib.auth import get_user_model
from rest_framework import permissions

User = get_user_model()


class FamilyView(viewsets.ModelViewSet):
    serializer_class = FamilySerializer
    queryset = Family.objects.all()


class PersonView(viewsets.ModelViewSet):
    serializer_class = PersonSerializer
    queryset = Person.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, )
    queryset = User.objects.all()


class ChildView(viewsets.ModelViewSet):
    serializer_class = ChildSerializer
    queryset = Child.objects.all()

