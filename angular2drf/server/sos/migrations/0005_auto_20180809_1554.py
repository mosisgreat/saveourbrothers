# -*- coding: utf-8 -*-
# Generated by Django 1.11.14 on 2018-08-09 15:54
from __future__ import unicode_literals

from django.db import migrations
import tinymce_4.fields


class Migration(migrations.Migration):

    dependencies = [
        ('sos', '0004_remove_donor_donor_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seeker',
            name='description',
            field=tinymce_4.fields.TinyMCEModelField(verbose_name='presentation'),
        ),
    ]
