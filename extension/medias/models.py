# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

# Create your models here.


class User(models.Model):
    pseudo = models.CharField(max_length=128)
    email = models.CharField(max_length=256)

    def __unicode__(self):
        return self.name


class Node(models.Model):
    name = models.CharField(max_length=256)
    website = models.CharField(max_length=256, null=True, blank=True)
    wiki = models.CharField(max_length=256, null=True, blank=True)
    long_name = models.CharField(max_length=256, blank=True, null=True)

    def __unicode__(self):
        return self.name

    class Meta:
        abstract = True


class Individual(Node):
    rank = models.IntegerField(blank=True, null=True)
    other_groups = models.CharField(max_length=256, blank=True, null=True)


class Company(Node):
    pass


class Media(Node):
    pass


class Share(models.Model):
    share = models.FloatField(null=True)

    child_content_type = models.ForeignKey(ContentType, related_name='share_child')
    child_object_id = models.PositiveIntegerField()
    child = GenericForeignKey('child_content_type', 'child_object_id')

    parent_content_type = models.ForeignKey(ContentType, related_name='share_parent')
    parent_object_id = models.PositiveIntegerField()
    parent = GenericForeignKey('parent_content_type', 'parent_object_id')

    special = models.CharField(max_length=32, null=True, blank=True)

    def __unicode__(self):
        return u"{0} % de {1} par {2}".format(
            self.share, self.child, self.parent)


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

    def __unicode__(self):
        return self.name


class Visit(models.Model):
    date = models.DateTimeField(auto_now_add=True,
                                auto_now=False,
                                verbose_name="Date de visite")
    media = models.ForeignKey(Entity)
    user = models.ForeignKey(User)

    def __unicode__(self):
        return u"{0} par {1} à {2}".format(
            self.media, self.user, self.date)
