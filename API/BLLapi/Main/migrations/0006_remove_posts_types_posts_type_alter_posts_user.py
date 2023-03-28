# Generated by Django 4.1.7 on 2023-03-27 21:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0005_alter_posts_types_alter_posts_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='posts',
            name='Types',
        ),
        migrations.AddField(
            model_name='posts',
            name='Type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='Main.types'),
        ),
        migrations.AlterField(
            model_name='posts',
            name='User',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Main.users'),
        ),
    ]