import json
from django.http import JsonResponse
#from rest_framework.decorators import api_view
#from rest_framework.response import Response


def api_home(request, *args, **kwargs):
    data = {}
    
    try:
        data = json.loads(request.body)
    except:
        pass

    data['headers'] = dict(request.headers)
    data['content_type'] = request.content_type

    return JsonResponse(data)
