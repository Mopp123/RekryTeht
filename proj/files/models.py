from django.db import models

class File(models.Model):
    organization = models.CharField(max_length=120)
    downloads = models.IntegerField()
    fileData = models.FileField(null=True)
