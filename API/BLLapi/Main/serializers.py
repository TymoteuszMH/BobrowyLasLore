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
#1st post serializer is for getting foreign keys and all data 
class PostsSerializer(serializers.ModelSerializer):
    User = UsersSerializer(many=False)
    Type = TypesSerializer(many=False)
    class Meta:
        model = Posts
        fields = '__all__'
#2nd is for adding and editing data
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'