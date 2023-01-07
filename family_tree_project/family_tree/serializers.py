from rest_framework import serializers
from .models import Family, Person
from django.contrib.auth import get_user_model
from dynamic_rest.serializers import DynamicModelSerializer
from dynamic_rest.fields import DynamicRelationField

User = get_user_model()


class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = '__all__'


class PersonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Person
        #fields = ['id', 'name', 'parent', 'partner', 'img', 'family', 'children']
        fields = ['pk', 'name', 'children']

    def get_fields(self):
        fields = super(PersonSerializer, self).get_fields()
        fields['children'] = PersonSerializer(many=True)
        return fields


class DPersonSerializer(DynamicModelSerializer):
    class Meta:
        model = Person
        fields = ['name', 'children']

    children = DynamicRelationField('DPersonSerializer')
