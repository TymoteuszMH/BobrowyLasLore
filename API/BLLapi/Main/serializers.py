from rest_framework import serializers
from Main.models import Users, Types, Posts

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['UserId','Username', 'Password']

class TypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Types
        fields = ['TypeId','Type']

class PostsSerializer(serializers.ModelSerializer):
    User = UsersSerializer(many=False, read_only=True)
    Type = TypesSerializer(many=False, read_only=True)
    class Meta:
        model = Posts
        fields = '__all__'