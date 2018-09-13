# http://engineroom.trackmaven.com/blog/getting-started-drf-angularjs-part-3/
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.db.models import Sum
from tinymce_4.fields import TinyMCEModelField

# regions in Senegal with shorcodes
REGIONS = (
    ('dakar', 'Dakar'),
    ('thies', 'Thies'),
    ('fatick', 'Fatick'),
    ('kolda', 'Kolda'),
    ('ziguinchor', 'Ziguinchor'),
)

DONOR_TYPES = (
    ('anonymous', 'Donneur Anonyme'),
    ('permanent', u'Donneur Permanent (avec un compte)'),
)

PAYMENT_METHODS = (
    ('wari', 'Wari'),
    ('credit', u'Carte de crédit'),
    ('omoney', u'Orange Money'),
)

DONATION_STATUS =(
	('succes', 'Succes'),
	('echec', 'Echec'),
	('en attente', 'En attente'),
)

PRIORITIES = (
    ('0', u'Urgent'),
    ('1', u'Normal'),
    ('2', u'Bas'),
)

# =======================================
# Model Adresse
# =======================================

class Address(models.Model):
	region = models.CharField(max_length=50, choices=REGIONS, default='dkr', help_text='Region')
	city = models.CharField(max_length=100, help_text='Ville')
	flat = models.CharField(max_length=300, help_text='Appartement', blank=True, null=True)
	google_map = models.CharField(max_length=500, help_text='Adresse google map', blank=True, null=True)
	seeker = models.ForeignKey('Seeker', null=True, related_name='addresses', blank=True)

	def __str__(self):
		return self.flat

# =======================================
# Model Seeker
# =======================================
class Seeker(models.Model):
	user = models.OneToOneField(User, null=True, blank=True)
	priority = models.CharField(max_length=1, default='1', choices=PRIORITIES)
	photo = models.ImageField(upload_to='seekers')
	phone = models.CharField(max_length=100, help_text='Numero telephone')
#	address = models.ForeignKey('Address', null=True, related_name='addresses', blank=True)
	target_amount = models.FloatField(null=True, blank=True, default=0)
	description = TinyMCEModelField('presentation')
	deadline = models.DateTimeField(null=True, blank=True)
	add_date = models.DateTimeField()
	donations = models.ManyToManyField('Donation')
	
	@property
	def raised_amount(self):
		qs = self.donations.all().aggregate(total_donations=Sum('amount'))
		if qs['total_donations'] is None: return 0
		return qs['total_donations']

	def get_absolute_url(self):
		return reverse('seeker-detail-view', args=[str(self.id)])

	def __str__(self):
		return self.user.username


# =======================================
# Model Donor
# =======================================
class Donor(models.Model):
#	full_name = models.CharField(max_length=200, help_text=u'Prénom & Nom du Donneur'), default=1, null=True
#	email = models.EmailField(max_length=100, blank=True, null=True, help_text='Adresse Mail')	
	user  = models.OneToOneField(User, null=True, blank=True)
	phone = models.CharField(max_length=100, blank=True, null=True, help_text=u'Numéro téléphone')	
#	donor_type = models.CharField(max_length=20, default='registered', choices=DONOR_TYPES)

	def get_absolute_url(self):
		return reverse('donor-detail-view', args=[str(self.id)])
	
	def __str__(self):
		return '[donor: %s phone: %s]' % (self.user.username, self.phone)

# =======================================
# Model Donation
# =======================================
class Donation(models.Model):
	donor = models.ForeignKey('Donor')
	patient = models.IntegerField(help_text='patient unique Id', blank=True, null=True)
	amount = models.FloatField(help_text='Donated amount!')
	method = models.CharField(max_length=20, default='credit', choices=PAYMENT_METHODS)
	status = models.CharField(max_length=30, default='en attente', choices=DONATION_STATUS, blank=True, null=True)
	date =  models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ('date',)

	def __str__(self):
		return 'donor=%s:  date=%s : amount=%d '% (self.donor, self.date, self.amount)






