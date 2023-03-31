from django.urls import path
from Main import views

from django.conf.urls.static import static
from django.conf import settings

#all needed paterns for api, there is one path for getting post by id and one for getting post by type
urlpatterns = [
    path('users/', views.usersApi),

    path('posts/', views.postsApi),
    path('post/<int:id>', views.postApi),
    path('posts/<int:type>', views.postsApi),
    
    path('saveFiles/', views.saveFile),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
