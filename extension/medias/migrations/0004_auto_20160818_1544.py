# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medias', '0003_auto_20160815_2038'),
    ]

    operations = [
        migrations.AddField(
            model_name='owner',
            name='website',
            field=models.CharField(max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='owner',
            name='wiki',
            field=models.CharField(max_length=256, null=True),
        ),
    ]
