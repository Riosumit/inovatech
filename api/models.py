from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=11)
    linkedin = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    
class Idea(models.Model):
    published_by = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True,related_name='User_Idea')
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200000)
    image = models.ImageField(upload_to="images", blank=True)

class Comment(models.Model):
    comment_on = models.ForeignKey('Idea', on_delete=models.SET_NULL, null=True, blank=True,related_name='Idea_Comment')
    comment_by = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True,related_name='User_Comment')
    comment_text = models.CharField(max_length=10000)