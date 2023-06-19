from rest_framework import serializers
from .models import User, Idea, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')


class UserDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id','name','email','phone','linkedin')

class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = ('__all__')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('__all__')