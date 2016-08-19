# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medias', '0007_auto_20160818_1651'),
    ]

    operations = [
        migrations.AddField(
            model_name='entity',
            name='other_groups',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='entity',
            name='rank',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='share',
            name='special',
            field=models.CharField(max_length=32, null=True, blank=True),
        ),
    ]
