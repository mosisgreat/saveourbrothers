# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import viewsets
from serializers import SeekerSerializer, DonorSerializer
from permissions import IsOwnerOrReadOnly
from sos.models import *

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from rest_framework.permissions import AllowAny

def index(request):
	return render(request, 'index.html', {})
#return render(request, 'sos/index.html', {}, content_type='application/xhtml+xml') 

# ViewSets define the view behavior.
class SeekerViewSet(viewsets.ModelViewSet):
    queryset = Seeker.objects.all().order_by('priority', '-add_date')
    serializer_class = SeekerSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def pre_save(self, obj):
    	obj.owner = self.request.user


"""
@csrf_exempt
def seeker_list(request):
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializer = SeekerSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = SeekerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
        #.subscribe(heroes => this.heroes = heroes.slice(1, 5));
"""

# ViewSets define the view behavior.
class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
    permission_classes = (AllowAny,)
#    permission_classes = (IsAuthenticated,) 
#    authentication_classes = (TokenAuthentication,) 
