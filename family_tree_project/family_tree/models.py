from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.dispatch import receiver

User = get_user_model()


@receiver(models.signals.post_save, sender=User)
def user_created(sender, instance, created, **kwargs):
    if created:
        Family.objects.create(user=instance, name=instance.family_name)


class Family(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=False, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class PersonManager(models.Manager):

    def get_by_natural_key(self, name):
        return self.get_or_create(name=name)[0]


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


class Child(models.Model):
    id = models.IntegerField(unique=True, primary_key=True)
    name = models.CharField("Name", max_length=20, blank=True)
    img = models.IntegerField(blank=True)
    parent = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='children2')
    family = models.ForeignKey(Family, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['parent']


class AccessRecord(models.Model):
    name = models.ForeignKey(Person, on_delete=models.DO_NOTHING)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.date
