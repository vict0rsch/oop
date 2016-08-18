# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medias', '0004_auto_20160818_1544'),
    ]

    operations = [
        migrations.CreateModel(
            name='Entity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=256)),
                ('website', models.CharField(max_length=256, null=True)),
                ('wiki', models.CharField(max_length=256, null=True)),
                ('category', models.CharField(max_length=1, choices=[(b'c', b'company'), (b'i', b'individual'), (b'm', b'media')])),
            ],
        ),
        migrations.RemoveField(
            model_name='media',
            name='owner',
        ),
        migrations.RemoveField(
            model_name='media',
            name='user',
        ),
        migrations.RemoveField(
            model_name='share',
            name='media',
        ),
        migrations.AlterField(
            model_name='share',
            name='owner',
            field=models.ForeignKey(related_name='owner', to='medias.Entity'),
        ),
        migrations.AlterField(
            model_name='visit',
            name='media',
            field=models.ForeignKey(to='medias.Entity'),
        ),
        migrations.DeleteModel(
            name='Media',
        ),
        migrations.DeleteModel(
            name='Owner',
        ),
        migrations.AddField(
            model_name='entity',
            name='user',
            field=models.ManyToManyField(to='medias.User', through='medias.Visit', blank=True),
        ),
        migrations.AddField(
            model_name='share',
            name='entity',
            field=models.ForeignKey(related_name='entity', default=0, to='medias.Entity'),
            preserve_default=False,
        ),
    ]
