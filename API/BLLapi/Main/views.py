from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

from Main.models import Users, Posts
from Main.serializers import UsersSerializer, PostSerializer, PostsSerializer

from django.core.files.storage import default_storage

# Create your views here.
#api for login don't need deleting user, because there is no such option on site
@csrf_exempt
def loginApi(request):
    try:
        user_data = JSONParser().parse(request)
        user = Users.objects.get(Username = user_data['Username'])
        if user.Password == user_data['Password']:
            return JsonResponse('logged', safe=False)
        return JsonResponse("error", safe=False)
    except ObjectDoesNotExist:
        return JsonResponse("error", safe=False)

@csrf_exempt
def usersApi(request, username=""):
    if request.method=='GET':
        try:
            user = Users.objects.get(Username = username)
            user_serializer = UsersSerializer(user)
            return JsonResponse(user_serializer.data['UserId'], safe=False)
        except ObjectDoesNotExist:
            return JsonResponse("error", safe=False)
    elif request.method=='POST':
        user_data = JSONParser().parse(request)
        user_serializer = UsersSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("added", safe=False)
        return JsonResponse("err", safe=False)
    elif request.method=='PUT':
        user_data = JSONParser().parse(request)
        user = Users.objects.get(UserId = user_data['UserId'])
        user_serializer = UsersSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("added", safe=False)
        return JsonResponse("err", safe=False)
#types doesn't need any api
#there is 1st post api for getting things by type and adding or editing post
@csrf_exempt
def postsApi(request, type=0):
    if request.method=='GET':
        if type>0:
            posts = Posts.objects.filter(Type = type)
            posts_serializer = PostsSerializer(posts, many=True)
            return JsonResponse(posts_serializer.data, safe=False)
        else:
            posts = Posts.objects.all()
            posts_serializer = PostsSerializer(posts, many=True)
            return JsonResponse(posts_serializer.data, safe=False)
    elif request.method=='POST':
        posts_data = JSONParser().parse(request)
        posts_serializer = PostSerializer(data=posts_data)
        print (posts_serializer)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return JsonResponse("Posts added successfully!", safe=False)
        return JsonResponse("Failed to add post" , safe=False)
    elif request.method=='PUT':
        posts_data = JSONParser().parse(request)
        posts = Posts.objects.get(PostId = posts_data['PostId'])
        posts_serializer = PostSerializer(posts, data=posts_data)
        print (posts_serializer)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return JsonResponse("Post updated successfully!", safe=False)
        return JsonResponse("Failed to update post", safe=False)
#and there is 2nd for getting post by id and deleting post
@csrf_exempt
def postApi(request, id):
    if request.method=='GET':
        try:
            post = Posts.objects.get(PostId = id)
            posts_serializer = PostsSerializer(post)
            return JsonResponse(posts_serializer.data, safe=False)
        except ObjectDoesNotExist:
            return JsonResponse("error", safe=False)
    elif request.method=='DELETE':
        posts = Posts.objects.get(PostId = id)
        posts.delete()
        return JsonResponse("Post deleted successfully!", safe=False)
#here's serializer for adding files
@csrf_exempt
def saveFile(request):
    file = request.FILES['uploadedFile']
    file_name = default_storage.save(file.name, file)

    return JsonResponse(file_name, safe=False)