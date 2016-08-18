# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medias', '0005_auto_20160818_1631'),
    ]

    operations = [
        migrations.AddField(
            model_name='entity',
            name='long_name',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
    ]
