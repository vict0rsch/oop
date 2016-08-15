# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medias', '0002_auto_20160815_1959'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('pseudo', models.CharField(max_length=128)),
                ('email', models.CharField(max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Visit',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name=b'Date de visite')),
                ('media', models.ForeignKey(to='medias.Media')),
                ('user', models.ForeignKey(to='medias.User')),
            ],
        ),
        migrations.AddField(
            model_name='media',
            name='user',
            field=models.ManyToManyField(to='medias.User', through='medias.Visit', blank=True),
        ),
    ]
