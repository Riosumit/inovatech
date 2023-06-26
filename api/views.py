from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import User, Idea, Comment
from .serializer import UserSerializer, IdeaSerializer, UserDetailSerializer, CommentSerializer
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

# Create your views here.
@csrf_exempt
def GetUser(request, pk):
    if request.method == 'GET':
        users = User.objects.filter(id=pk).values('id', 'name','email','phone','linkedin')
        serializer = UserDetailSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)

class UserLogin(APIView):
    def post(self, request, format=None):
        jsonData = JSONParser().parse(request)
        user = User.objects.filter(email=jsonData['email'], password=jsonData['password'])
        if user:
            print(request.user)
            request.session["loggedin"] = True
            user = UserSerializer(user[0], many=False)
            return JsonResponse({"found":"true", "msg":"", "data":user.data})
        else:
            return JsonResponse({"found":"false", "msg":"Incorrect Email or Password"})
        
def UserLogout(request):
    try:
        del request.session["loggedin"]
        return JsonResponse({"msg":"LoggedOut Succesfully"})
    except:
        return JsonResponse({"msg":"LoggedOut Unsuccesful"})
        
def IsUserLogin(request):
    try:
        loggedin = request.session["loggedin"]
    except:
        loggedin = False
    return JsonResponse({"loggedin":loggedin})
     
class UserSignUp(APIView):
    def post(self, request, format=None):
        jsonData = JSONParser().parse(request)
        serializer = UserSerializer(data=jsonData)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"status": "success", "msg":"Registered succesfully", "data":serializer.data}, safe=False)
        else:
            return JsonResponse(serializer.errors)
        
class AddIdea(APIView):
    parser_classes = (MultiPartParser, FormParser,)
    def post(self, request, format=None):
        # try:
        #     loggedin = request.session["loggedin"]
        # except:
        #     loggedin = False
        # if not loggedin :
        #     return JsonResponse({"msg": "Not Loggedin"}, safe=False)
        serializer = IdeaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"status":"success", "msg": "Idea Added Succesfully"}, safe=False)
        else:
            return JsonResponse(serializer.errors)
        
class ShowIdea(APIView):
    def get(self, request, format=None):
        Ideas = reversed(Idea.objects.all())
        serializer = IdeaSerializer(Ideas, many=True)
        return JsonResponse(serializer.data, safe=False)
    
def getIdea(request,pk):
    if request.method == "GET":
        idea = Idea.objects.get(pk=pk)
        if idea:
            serializer = IdeaSerializer(idea, many=False)
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse({"success":"False", "msg": "Idea doesn't exist"}, safe=False)
    else:
         return JsonResponse({"success":"False", "msg": (request.method + " method is not allowed")}, safe=False)
    

def deleteIdea(request, pk):
    if request.method == "GET":
        idea = Idea.objects.filter(id=pk)
        if idea:
            idea.delete()
            return JsonResponse({"success":"True", "msg": "Idea deleted succesfully"}, safe=False)
        return JsonResponse({"success":"False", "msg": "Idea doesn't exist"}, safe=False)

class UpdateIdea(APIView):
    parser_classes = (MultiPartParser, FormParser,)
    def post(self, request, format=None):
        print(1)
        idea = Idea.objects.get(id=5)
        print(request)
        serializer = IdeaSerializer(instance=idea, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"success":True, "msg": "Updated Successfully"}, safe=False)
        else:
            return JsonResponse({"success":False, "msg": serializer.errors}, safe=False)
        
class AddComment(APIView):
    def post(self, request, format=None):
        jsonData = JSONParser().parse(request)
        serializer = CommentSerializer(data=jsonData)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"status":"success", "msg": "Commented Succesfully"}, safe=False)
        else:
            return JsonResponse(serializer.errors)
        
def getComments(request, pk):
    if request.method == "GET":
        comments = reversed(Comment.objects.filter(comment_on=pk))
        serializer = CommentSerializer(comments, many=True)
        return JsonResponse(serializer.data, safe=False)

def getIdeas(request, pk):
    if request.method == "GET":
        ideas = reversed(Idea.objects.filter(published_by=pk))
        seriailizer = IdeaSerializer(ideas, many=True)
        return JsonResponse(seriailizer.data, safe=False)