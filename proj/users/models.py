from django.db import models


class User(models.Model):
    name = models.CharField(max_length=128)
    organization = models.CharField(max_length=128)
    password = models.CharField(max_length=128)

    def validatePassword(self, passwd):
        return self.password == passwd 
