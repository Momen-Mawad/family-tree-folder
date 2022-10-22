from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .serializer import MyTokenObtainPairSerializer, RegisterSerializer, DeleteSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView


User = get_user_model()

# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/authentication/token/',
        '/authentication/register/',
        '/authentication/token/refresh/'
    ]
    return Response(routes)


class DeleteAccount(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = DeleteSerializer
    # permission_classes = (IsAuthenticated,)

