# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=256)),
                ('website', models.CharField(max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Owner',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Share',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('share', models.FloatField(null=True)),
                ('media', models.ForeignKey(to='medias.Media')),
                ('owner', models.ForeignKey(to='medias.Owner')),
            ],
        ),
        migrations.AddField(
            model_name='media',
            name='owner',
            field=models.ManyToManyField(to='medias.Owner', null=True, through='medias.Share'),
        ),
    ]
