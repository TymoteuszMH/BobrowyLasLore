from django.urls import re_path
from Main import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    re_path('users/', views.usersApi),
    re_path('users/([0-9]+)', views.usersApi),

    re_path('types/', views.typesApi),
    re_path('types/([0-9]+)', views.typesApi),

    re_path('posts/', views.postsApi),
    re_path('posts/([0-9]+)', views.postsApi),

    re_path('saveFiles', views.saveFile),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
