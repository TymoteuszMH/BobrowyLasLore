# Generated by Django 4.1.7 on 2023-03-27 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0003_posts_postcontent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='PostContent',
            field=models.TextField(),
        ),
    ]
