# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, Http404

# Create your views here.
# def list_articles(request, month, year):
#     """ Liste des articles d'un mois précis. """

#     text = "Vous avez demandé les articles de {0} {1}.".format(month, year)
#     if int(month) > 12:
#         raise Http404
#     return HttpResponse(text)