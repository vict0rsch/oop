# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medias', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='media',
            name='owner',
            field=models.ManyToManyField(to='medias.Owner', through='medias.Share', blank=True),
        ),
    ]
