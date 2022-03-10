import json
from rest_framework.parsers import FormParser
from rest_framework.parsers import MultiPartParser
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response

from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes



from files.models import File

@api_view(['POST'])
@parser_classes([FormParser, MultiPartParser, FileUploadParser])
def view_uploadFile(request, *args, **kwargs):
    print("Attempting to upload file...")
    
    try:
        File.objects.create(organization='Testing', downloads=0, fileData=request.FILES['file'])

        print("Upload success")
    except:
        print("Upload failed")


    return Response({"message":"responseHere"})
