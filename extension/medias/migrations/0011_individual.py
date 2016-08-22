# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medias', '0010_auto_20160821_2240'),
    ]

    operations = [
        migrations.CreateModel(
            name='Individual',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=256)),
                ('rank', models.IntegerField(null=True, blank=True)),
                ('other_groups', models.CharField(max_length=256, null=True, blank=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
