# Generated by Django 3.2.7 on 2021-10-19 09:36

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Data', models.TextField(default='')),
                ('dataJson', models.JSONField()),
                ('DateTime', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
