from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib import auth
from rest_framework.response import Response
from family_tree.models import Family
from .serializers import UserSerializer
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

User = get_user_model()


class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})
        except TypeError:
            return Response({'error': 'Something went wrong when checking '
                                      'authentication status'})


@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']
        family_name = data['family_name']

        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'Username already exists'})
                else:
                    if len(password) < 6:
                        return Response({
                            'error': 'Password must be at least 6 characters'})
                    else:
                        user = User.objects.create_user(username=username,
                                                        password=password)
                        user = User.objects.get(id=user.id)

                        family = Family.objects.create(user=user,
                                                       name=family_name)
                        family.save()
                        
                        return Response({
                            'success': 'Family created successfully'})
            else:
                return Response({'error': 'Passwords do not match'})
        except TypeError:
            return Response({
                'error': 'Something went wrong when registering account'})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({'success': 'User authenticated',
                                 'username': username})
            else:
                return Response({'error': 'Error Authenticating'})
        except TypeError:
            return Response({'error': 'Something went wrong when logging in'})


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': 'Loggout Out'})
        except TypeError:
            return Response({'error': 'Something went wrong when logging out'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        value = request.COOKIES.get('csrftoken')

        return Response(value)


class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()

            return Response({'success': 'User deleted successfully'})
        except TypeError:
            return Response(
                {'error': 'Something went wrong when trying to delete user'})


class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        if request.META['REMOTE_ADDR'] == '127.0.0.1':
            users = User.objects.all()
            users = UserSerializer(users, many=True)
            return Response(users.data)
        else:
            return Response(status=401)

