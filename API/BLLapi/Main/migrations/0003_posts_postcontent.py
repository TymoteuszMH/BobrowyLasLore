# Generated by Django 4.1.7 on 2023-03-27 20:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0002_remove_posts_author_remove_posts_type_posts_types_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='posts',
            name='PostContent',
            field=models.TextField(default='err'),
        ),
    ]
