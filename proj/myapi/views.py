import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
#from rest_framework.decorators import api_view
#from rest_framework.response import Response

@csrf_exempt
def api_home(request, *args, **kwargs):
    data = {}
    
    print("Acquired request:")
    print(request.body)

    try:
        data = json.loads(request.body)
        print("req body loaded successfully!")
    except:
        print("Failed to load req body!")
        pass

    data['headers'] = dict(request.headers)
    data['content_type'] = request.content_type
   
    
    return JsonResponse(data)
