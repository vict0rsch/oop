# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medias', '0009_auto_20160819_1002'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='share',
            name='entity',
        ),
        migrations.RemoveField(
            model_name='share',
            name='owner',
        ),
        migrations.DeleteModel(
            name='Share',
        ),
    ]
