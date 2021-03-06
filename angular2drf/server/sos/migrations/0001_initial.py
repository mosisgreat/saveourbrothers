# -*- coding: utf-8 -*-
# Generated by Django 1.11.14 on 2018-07-26 17:11
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('region', models.CharField(choices=[('dakar', 'Dakar'), ('thies', 'Thies'), ('fatick', 'Fatick'), ('kolda', 'Kolda'), ('ziguinchor', 'Ziguinchor')], default='dkr', help_text='Region', max_length=3)),
                ('city', models.CharField(help_text='Ville', max_length=100)),
                ('flat', models.CharField(blank=True, help_text='Appartement', max_length=300, null=True)),
                ('google_map', models.CharField(blank=True, help_text='Adresse google map', max_length=500, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField(help_text='Donated amount!')),
                ('method', models.CharField(choices=[('wari', 'Wari'), ('credit', 'Carte de cr\xe9dit'), ('omoney', 'Orange Money')], default='credit', max_length=20)),
                ('status', models.CharField(blank=True, choices=[('succes', 'Succes'), ('echec', 'Echec'), ('en attente', 'En attente')], default='en attente', max_length=30, null=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('date',),
            },
        ),
        migrations.CreateModel(
            name='Donor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(blank=True, help_text='Num\xe9ro t\xe9l\xe9phone', max_length=100, null=True)),
                ('donor_type', models.CharField(choices=[('anonymous', 'Donneur Anonyme'), ('permanent', 'Donneur Permanent (avec un compte)')], default='registered', max_length=20)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Seeker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('priority', models.CharField(choices=[('0', 'Urgent'), ('1', 'Normal'), ('2', 'Bas')], default='1', max_length=1)),
                ('photo', models.ImageField(upload_to='seekers')),
                ('phone', models.CharField(help_text='Numero telephone', max_length=100)),
                ('target_amount', models.FloatField(blank=True, default=0, null=True)),
                ('description', models.TextField()),
                ('deadline', models.DateTimeField(blank=True, null=True)),
                ('add_date', models.DateTimeField()),
                ('donations', models.ManyToManyField(to='sos.Donation')),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='donation',
            name='donor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sos.Donor'),
        ),
        migrations.AddField(
            model_name='donation',
            name='patient',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sos.Seeker'),
        ),
        migrations.AddField(
            model_name='address',
            name='seeker',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to='sos.Seeker'),
        ),
    ]
