# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('medias', '0012_company_media'),
    ]

    operations = [
        migrations.CreateModel(
            name='Share',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('share', models.FloatField(null=True)),
                ('child_object_id', models.PositiveIntegerField()),
                ('parent_object_id', models.PositiveIntegerField()),
                ('special', models.CharField(max_length=32, null=True, blank=True)),
                ('child_content_type', models.ForeignKey(related_name='child', to='contenttypes.ContentType')),
                ('parent_content_type', models.ForeignKey(related_name='parent', to='contenttypes.ContentType')),
            ],
        ),
        migrations.AddField(
            model_name='company',
            name='long_name',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='company',
            name='website',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='company',
            name='wiki',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='individual',
            name='long_name',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='individual',
            name='website',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='individual',
            name='wiki',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='media',
            name='long_name',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='media',
            name='website',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='media',
            name='wiki',
            field=models.CharField(max_length=256, null=True, blank=True),
        ),
    ]
