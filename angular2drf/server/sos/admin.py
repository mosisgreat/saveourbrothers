# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Address, Seeker, Donor, Donation

admin.site.register(Address)
admin.site.register(Seeker)
admin.site.register(Donor)
admin.site.register(Donation)
# Register your models here.
