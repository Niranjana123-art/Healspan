from django.db import models

class Patient(models.Model):
    claimid = models.IntegerField()
    name = models.CharField(max_length=100)
    ailment = models.CharField(max_length=100)
    sla = models.CharField(max_length=100)
    ptat = models.CharField(max_length=100)
    stage = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    approvedAmount = models.CharField(max_length=100)
    hospital = models.CharField(max_length=100)
# Create your models here.
