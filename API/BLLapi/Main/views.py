from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from Main.models import Users, Types, Posts
from Main.serializers import UsersSerializer, TypesSerializer, PostsSerializer

from django.core.files.storage import default_storage

# Create your views here.
@csrf_exempt
def usersApi(request, id=0):
    if request.method=='GET':
        user = Users.objects.all()
        user_serializer = UsersSerializer(user, many=True)
        return JsonResponse(user_serializer.data, safe=False)
    elif request.method=='POST':
        user_data = JSONParser().parse(request)
        user_serializer = UsersSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("User added successfully!", safe=False)
        return JsonResponse("Failed to add user", safe=False)
    elif request.method=='PUT':
        user_data = JSONParser().parse(request)
        user = Users.objects.get(UserId = user_data['UserId'])
        user_serializer = UsersSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("User updated successfully!", safe=False)
        return JsonResponse("Failed to update user", safe=False)
    elif request.method=='DELETE':
        user = Users.objects.get(UserId = id)
        user.delete()
        return JsonResponse("User deleted successfully!", safe=False)
    
@csrf_exempt
def typesApi(request, id=0):
    if request.method=='GET':
        types = Types.objects.all()
        types_serializer = TypesSerializer(types, many=True)
        return JsonResponse(types_serializer.data, safe=False)
    elif request.method=='POST':
        type_data = JSONParser().parse(request)
        types_serializer = TypesSerializer(data=type_data)
        if types_serializer.is_valid():
            types_serializer.save()
            return JsonResponse("Type added successfully!", safe=False)
        return JsonResponse("Failed to add type", safe=False)
    elif request.method=='PUT':
        types_data = JSONParser().parse(request)
        types = Types.objects.get(TypeId = types_data['TypeId'])
        types_serializer = TypesSerializer(types, data=types_data)
        if types_serializer.is_valid():
            types_serializer.save()
            return JsonResponse("Type updated successfully!", safe=False)
        return JsonResponse("Failed to update type", safe=False)
    elif request.method=='DELETE':
        types = Types.objects.get(TypeId = id)
        types.delete()
        return JsonResponse("Type deleted successfully!", safe=False)

@csrf_exempt
def postsApi(request, id=0):
    if request.method=='GET':
        posts = Posts.objects.all()
        posts_serializer = PostsSerializer(posts, many=True)
        return JsonResponse(posts_serializer.data, safe=False)
    elif request.method=='POST':
        posts_data = JSONParser().parse(request)
        posts_serializer = PostsSerializer(data=posts_data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return JsonResponse("Posts added successfully!", safe=False)
        return JsonResponse("Failed to add post" , safe=False)
    elif request.method=='PUT':
        posts_data = JSONParser().parse(request)
        posts = Posts.objects.get(PostId = posts_data['PostId'])
        posts_serializer = PostsSerializer(posts, data=posts_data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return JsonResponse("Post updated successfully!", safe=False)
        return JsonResponse("Failed to update post", safe=False)
    elif request.method=='DELETE':
        posts = Posts.objects.get(PostId = id)
        posts.delete()
        return JsonResponse("Post deleted successfully!", safe=False)

@csrf_exempt
def saveFile(request):
    file = request.FILES['uploadedFile']
    file_name = default_storage.save(file.name, file)

    return JsonResponse(file_name, safe=False)