from django.contrib import admin
from django.urls import path, include, re_path
from . import views
from django.conf import settings
from django.views.static import serve
from .views import UserLogin, UserSignUp, IsUserLogin, AddIdea, ShowIdea, deleteIdea, GetUser, AddComment, getComments, getIdeas, getIdea, UpdateIdea

urlpatterns = [
    path('login', UserLogin.as_view()),
    path('signup', UserSignUp.as_view()),
    path('islogin', IsUserLogin),
    path('publish', AddIdea.as_view()),
    path('ideas', ShowIdea.as_view()),
    path('idea/<pk>', getIdea),
    path('delete/<pk>', deleteIdea),
    path('update', UpdateIdea.as_view()),
    path('user/<pk>', GetUser),
    path('comment', AddComment.as_view()),
    path('comment/<pk>', getComments),
    path('ideas/<pk>', getIdeas)
]