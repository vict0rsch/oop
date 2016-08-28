# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medias', '0013_auto_20160822_1017'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Company',
        ),
        migrations.DeleteModel(
            name='Individual',
        ),
        migrations.DeleteModel(
            name='Media',
        ),
        migrations.RemoveField(
            model_name='share',
            name='child_content_type',
        ),
        migrations.RemoveField(
            model_name='share',
            name='child_object_id',
        ),
        migrations.RemoveField(
            model_name='share',
            name='parent_content_type',
        ),
        migrations.RemoveField(
            model_name='share',
            name='parent_object_id',
        ),
        migrations.AddField(
            model_name='entity',
            name='share',
            field=models.ManyToManyField(to='medias.Entity', through='medias.Share', blank=True),
        ),
        migrations.AddField(
            model_name='share',
            name='child',
            field=models.ForeignKey(related_name='child_entity', default=0, to='medias.Entity'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='share',
            name='parent',
            field=models.ForeignKey(related_name='parent_entity', default=0, to='medias.Entity'),
            preserve_default=False,
        ),
    ]
