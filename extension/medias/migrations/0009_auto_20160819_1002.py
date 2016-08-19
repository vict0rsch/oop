# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medias', '0008_auto_20160819_0956'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entity',
            name='wiki',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
    ]
