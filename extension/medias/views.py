# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from medias.models import *
import json
from django.forms import model_to_dict

# Create your views here.
# def list_articles(request, month, year):
#     """ Liste des articles d'un mois précis. """

#     text = "Vous avez demandé les articles de {0} {1}.".format(month, year)
#     if int(month) > 12:
#         raise Http404
#     return HttpResponse(text)


@csrf_exempt
def test_ajax(request):
    if request.method == 'POST':
        message = {}
        message['email'] = request.POST['email']
        message['pseudo'] = request.POST['pseudo']
    else:
        message = "Not Ajax"
    response = json.dumps(message)
    return HttpResponse(response)


@csrf_exempt
def get_data(request):
    message = {}
    entitys = Entity.objects.all()
    shares = Share.objects.all()
    j_entity = []
    j_share = []

    for e in entitys:
        j_entity.append(model_to_dict(e, exclude=['share', 'user']))
    for s in shares:
        j_share.append(model_to_dict(s))

    message['entitys'] = j_entity
    message['shares'] = j_share
    response = json.dumps(message)
    return HttpResponse(response, content_type='application/json')
