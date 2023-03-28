from django.urls import path
from Main import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('users/', views.usersApi),
    path('users/<int:id>', views.usersApi),

    path('types/', views.typesApi),
    path('types/<int:id>', views.typesApi),

    path('posts/', views.postsApi),
    path('posts/<int:id>', views.postsApi),
    
    path('saveFiles', views.saveFile),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
