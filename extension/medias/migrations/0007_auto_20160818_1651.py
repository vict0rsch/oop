# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medias', '0006_entity_long_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entity',
            name='website',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
    ]
