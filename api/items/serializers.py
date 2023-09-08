from rest_framework import serializers
from items.models import Item
from django.db import models

class ItemSerializer(serializers.ModelSerializer):
    # Meta data is important to serialize the fields in Item Model
    class Meta:
        model = Item
        fields = ['id', 'name', 'quantity', 'location', 'notes']
