import json
from rest_framework.parsers import FormParser
from rest_framework.parsers import MultiPartParser
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response

from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes

from django.conf import settings
import os

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


@api_view(['POST'])
def view_getFileListing(request, *args, **kwargs):
    print("Attempting to provide file listing...")

    try:

        responseData = {}

        fileSet = File.objects.all()
        for f in fileSet.iterator():
            responseData[f.fileData.name] = f.fileData.url

        return Response(responseData)

    except:
        print("Failure!")
        return Response({"message":"error"})


@api_view(['POST'])
def view_getFile(request, *args, **kwargs):
    print("Attempting to provide a file...")

    reqData = {}
    try:

        reqData = json.loads(request.body)
        
        filesSet = File.objects.all();
        for f in filesSet.iterator():
            if f.fileData.name == reqData['filename']:
                print("FILE FOUND :)")
                file_obj = f.fileData
                path = os.path.join(settings.MEDIA_ROOT, file_obj.name)
                return Response({'file': path}, status=201)

        return Response({"message":"success"})

    except:
        print("Failure!")
        return Response({"message":"error"})
