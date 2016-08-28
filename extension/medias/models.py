# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError

# Create your models here.


class User(models.Model):
    pseudo = models.CharField(max_length=128)
    email = models.CharField(max_length=256)

    def __unicode__(self):
        return self.name


class Entity(models.Model):
    ownership = (
        ('c', 'company'),
        ('i', 'individual'),
        ('m', 'media')
    )
    name = models.CharField(max_length=256)
    website = models.CharField(max_length=256, null=True, blank=True)
    wiki = models.CharField(max_length=256, null=True, blank=True)
    category = models.CharField(max_length=1, choices=ownership)
    user = models.ManyToManyField(User, through='Visit', blank=True)
    rank = models.IntegerField(blank=True, null=True)
    other_groups = models.CharField(max_length=256, blank=True, null=True)
    long_name = models.CharField(max_length=256, blank=True, null=True)
    share = models.ManyToManyField('self', through='Share', blank=True,
                                   symmetrical=False)

    def __unicode__(self):
        return self.name


class Share(models.Model):
    share = models.FloatField(null=True)
    child = models.ForeignKey(Entity, related_name='child_entity')
    parent = models.ForeignKey(Entity, related_name='parent_entity')

    special = models.CharField(max_length=32, null=True, blank=True)

    def save(self, *args, **kwargs):
        if Share.objects.filter(child__name=self.child.name,
                                parent__name=self.parent.name).count() > 0:
            print'\n### SHARE SAVE ERROR : ', self.child.name, self.parent.name
            raise ValidationError('Entry exists')
        else:
            super(Share, self).save(*args, **kwargs)

    def __unicode__(self):
        return u"{0} % de {1} par {2}".format(
            self.share, self.child, self.parent)


class Visit(models.Model):
    date = models.DateTimeField(auto_now_add=True,
                                auto_now=False,
                                verbose_name="Date de visite")
    media = models.ForeignKey(Entity)
    user = models.ForeignKey(User)

    def __unicode__(self):
        return u"{0} par {1} à {2}".format(
            self.media, self.user, self.date)
