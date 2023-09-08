from django.db import models

# Create your models here.
class Item(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=240, unique=True)
    quantity = models.IntegerField()
    location = models.CharField(max_length=20)
    notes = models.TextField()

    def __str__(self):
        return self.name
