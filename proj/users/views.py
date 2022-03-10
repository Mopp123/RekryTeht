import json
#from django.views.decorators.csrf import csrf_exempt
#from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from users.models import User


#Creating new user
@api_view(["POST"])
def view_createUser(request, *args, **kwargs):
    print("Attempting to create new user...")
    data = {}
    
    print(request.body)
    
    try:

        data = json.loads(request.body)
        
        print("req body loaded successfully: ")
        
        username = data['username']
        org = data['organization']
        passwd = data['password']
        
        print("Attempting to create user (" + username + ", " + org + ", " + passwd + ")")

        User.objects.create(name=username, organization=org, password=passwd)

        print("Current usrs:")
        
        for u in User.objects.all():
            print(u.name)

        return Response({"message":"success"})

    except:
        print("Failed to create user")
        
        return Response({"message":"failure"})


# User logging in
@api_view(["POST"])
def view_login(request, *args, **kwargs):
    print("Attempting to login user")
    data = {}
    
    print(request.body)
    
    try:

        data = json.loads(request.body)
        
        print("req body loaded successfully: ")
        reqUser = User.objects.get(name=data['username'], password=data['password'])
        if reqUser:
            request.session['id'] = reqUser.id
            print("User(" + reqUser.name + ": " + str(reqUser.id) + ") logged in successfully")
            return Response({"message":"success"})

    except:
        return Response({"message":"error"})


# User logging out
@api_view(["POST"])
def view_logout(request, *args, **kwargs):
    print("Attempting to logout user")
    data = {}
    
    print(request.body)
    
    try:
        del request.session['id']
        print("User logged out successfully")
        return Response({"message":"success"})
    except:
        return Response({"message":"error"})
