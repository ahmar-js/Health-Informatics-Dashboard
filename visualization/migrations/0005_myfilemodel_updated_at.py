# Generated by Django 4.2.4 on 2023-09-26 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visualization', '0004_myfilemodel_uploaded_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='myfilemodel',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]