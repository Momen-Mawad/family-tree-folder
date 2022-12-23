from rest_framework import viewsets
from .models import Person, Family
from .serializers import FamilySerializer, PersonSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions


from django.contrib.auth import get_user_model

User = get_user_model()


class PersonView(viewsets.ModelViewSet):
    serializer_class = PersonSerializer

    def list(self, request):
        user = self.request.user
        try:
            family = Family.objects.get(user=user)

            queryset = Person.objects.filter(family=family.id).order_by('id')
            serializer = PersonSerializer(queryset, many=True)

            print(serializer.data)
            return Response(serializer.data)

        except TypeError:
            return Response({
                'error': 'Something went wrong when retrieving persons',
                'result': str(user)})

    def update(self, request):
        try:
            user = self.request.user
            username = user.username
            family = Family.objects.get(user=user)

            data = self.request.data
            name = data['name']
            pid = data['pid']
            parent = data['parent']
            partner = data['partner']
            img = data['img']

            Person.objects.filter(family=family.id).update(
                name=name,
                pid=pid,
                parent=parent,
                partner=partner,
                img=img)

            person = Person.objects.get(family=family.id)
            person = PersonSerializer(person)

            return Response({'person': person.data, 'username': str(username)})
        except TypeError:
            return Response({'error': 'Something went wrong when updating profile'})


class GetFamiliesView(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny, )
    serializer_class = FamilySerializer
    queryset = Family.objects.all()

    def list(self, request):
        queryset = Family.objects.all()
        if request.META['REMOTE_ADDR'] == '127.0.0.1':
            families = FamilySerializer(queryset, many=True)
            return Response(families.data)
        else:
            return Response(status=401)
