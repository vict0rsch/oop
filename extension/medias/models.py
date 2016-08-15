# -*- coding: utf-8 -*-

from django.db import models

# Create your models here.


class Owner(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class User(models.Model):
    pseudo = models.CharField(max_length=128)
    email = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class Media(models.Model):
    name = models.CharField(max_length=256)
    website = models.CharField(max_length=256)
    owner = models.ManyToManyField(Owner, through='Share', blank=True)
    user = models.ManyToManyField(User, through='Visit', blank=True)

    def __str__(self):
        return self.name


class Share(models.Model):
    share = models.FloatField(null=True)
    media = models.ForeignKey(Media)
    owner = models.ForeignKey(Owner)

    def __str__(self):
        return u"{0} % de {1} par {2}".format(
            self.share, self.media, self.owner)


class Visit(models.Model):
    date = models.DateTimeField(auto_now_add=True,
                                auto_now=False,
                                verbose_name="Date de visite")
    media = models.ForeignKey(Media)
    user = models.ForeignKey(User)

    def __str__(self):
        return u"{0} par {1} à {2}".format(
            self.media, self.user, self.date)
