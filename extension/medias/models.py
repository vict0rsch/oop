# -*- coding: utf-8 -*-

from django.db import models

# Create your models here.


class Owner(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class Media(models.Model):
    name = models.CharField(max_length=256)
    website = models.CharField(max_length=256)
    owner = models.ManyToManyField(Owner, through='Share', blank=True)

    def __str__(self):
        return self.name


class Share(models.Model):
    share = models.FloatField(null=True)
    media = models.ForeignKey(Media)
    owner = models.ForeignKey(Owner)

    def __str__(self):
        return u"{0} % de {1} par {2}".format(
            self.share, self.media, self.owner)


class User(models.model):
    pseudo = models.CharField(max_length=128)
    
