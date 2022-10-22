from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Family(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=False, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Person(models.Model):
    id = models.IntegerField(unique=True, primary_key=True)
    name = models.CharField("Name", max_length=20, blank=True)
    pid = models.IntegerField("Parent ID", blank=True)
    parent = models.ForeignKey('Person', null=True, blank=True, on_delete=models.CASCADE, related_name='children')
    partner = models.CharField("Partner ID", max_length=20, blank=True)
    img = models.IntegerField(blank=True)
    family = models.ForeignKey(Family, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']


class AccessRecord(models.Model):
    name = models.ForeignKey(Person, on_delete=models.DO_NOTHING)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.date
