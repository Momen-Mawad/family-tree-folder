from rest_framework import serializers
from .models import Family, Person
from django.contrib.auth import get_user_model
from rest_framework_recursive.fields import RecursiveField


User = get_user_model()


class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = '__all__'


class PersonSerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True)

    class Meta:
        model = Person
        fields = ['pk', 'name', 'children']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["children"] = sorted(response["children"],
                                      key=lambda x: x["pk"],
                                      reverse=True)
        return response
