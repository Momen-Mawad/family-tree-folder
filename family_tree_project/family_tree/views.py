from rest_framework import viewsets
from .models import Person, Family
from .serializers import FamilySerializer, PersonSerializer, DPersonSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from dynamic_rest.viewsets import DynamicModelViewSet


from django.contrib.auth import get_user_model

User = get_user_model()


class PersonView(viewsets.ModelViewSet):
    serializer_class = PersonSerializer

    def list(self, request):
        user = self.request.user
        try:
            family = Family.objects.get(user=user)
            queryset = Person.objects.filter(family=family.id)
            serializer = PersonSerializer(queryset, many=True)

            # sorting first generation
            for key, value in enumerate(serializer.data):
                child_list_1 = value['children']
                child_list_sorted_1 = sorted(child_list_1, key=lambda d: d["pk"], reverse=True)
                serializer.data[key]['children'] = child_list_sorted_1

                # sorting second generation
                for key2, value2 in enumerate(serializer.data[key]['children']):
                    child_list_2 = value2['children']
                    child_list_sorted_2 = sorted(child_list_2, key=lambda d: d["pk"], reverse=True)
                    serializer.data[key]['children'][key2]['children'] = child_list_sorted_2

                    # sorting third generation
                    for key3, value3 in enumerate(serializer.data[key]['children'][key2]['children']):
                        child_list_3 = value3['children']
                        child_list_sorted_3 = sorted(child_list_3, key=lambda d: d["pk"], reverse=True)
                        serializer.data[key]['children'][key2]['children'][key3]['children'] = child_list_sorted_3

                        # sorting fourth generation
                        for key4, value4 in enumerate(serializer.data[key]['children'][key2]['children'][key3]['children']):
                            child_list_4 = value4['children']
                            child_list_sorted_4 = sorted(child_list_4, key=lambda d: d["pk"], reverse=True)
                            serializer.data[key]['children'][key2]['children'][key3]['children'][key4]['children'] = child_list_sorted_4

            return Response(serializer.data)

        except Exception as e:
            return Response({
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


class DPersonView(DynamicModelViewSet):
    serializer_class = DPersonSerializer
    queryset = Person.objects.all().reverse()


from dynamic_rest.fields import DynamicRouter


router = DynamicRouter()
router.register('/dperson', DPersonView)
