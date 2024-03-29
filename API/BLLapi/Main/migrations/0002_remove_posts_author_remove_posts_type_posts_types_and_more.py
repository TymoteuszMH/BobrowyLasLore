# Generated by Django 4.1.7 on 2023-03-27 20:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='posts',
            name='Author',
        ),
        migrations.RemoveField(
            model_name='posts',
            name='Type',
        ),
        migrations.AddField(
            model_name='posts',
            name='Types',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='PostType', to='Main.types'),
        ),
        migrations.AddField(
            model_name='posts',
            name='User',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='PostAuthor', to='Main.users'),
        ),
    ]
