# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.views.decorators.csrf import csrf_exempt


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
        message = "Yes, AJAX! {0} {1}".format(
            request.POST['email'], request.POST['pseudo'])
    else:
        message = "Not Ajax"
    return HttpResponse(message)
