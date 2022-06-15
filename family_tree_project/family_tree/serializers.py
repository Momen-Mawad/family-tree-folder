from rest_framework import serializers
from .models import Family, Person, Child
from django.contrib.auth import get_user_model

User = get_user_model()


class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = '__all__'


class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        # fields = ('id', 'name', 'img', 'parent', 'family')
        fields = '__all__'


class PersonSerializer(serializers.ModelSerializer):

    # children = ChildSerializer(many=True, read_only=True)
    #children = serializers.ManyRelatedField()
    class Meta:
        model = Person
        fields = ['id', 'name', 'pid', 'parent', 'partner', 'img', 'family', 'children']

    def get_fields(self):
        fields = super(PersonSerializer, self).get_fields()
        fields['children'] = PersonSerializer(many=True)
        return fields


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
