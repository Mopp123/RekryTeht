# Generated by Django 4.0.3 on 2022-03-10 22:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='file',
            name='data',
        ),
        migrations.AddField(
            model_name='file',
            name='fileData',
            field=models.FileField(null=True, upload_to=''),
        ),
    ]
