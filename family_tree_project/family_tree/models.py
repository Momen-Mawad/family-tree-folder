from django.db import models
from django.utils.text import slugify
from django.urls import reverse
from django.conf import settings


class Family(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(allow_unicode=True, unique=True)
    description = models.TextField(blank=True, default='')
    description_html = models.TextField(editable=False, default='', blank=True)
    members = models.IntegerField()

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        self.members = PersonData.all().count()
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('families:single', kwargs={'slug': self.slug})

    class Meta:
        ordering = ['name']


class PersonData(models.Model):
    id = models.IntegerField(unique=True, primary_key=True)
    first = models.CharField(max_length=20, blank=True, null=True)
    second = models.CharField(max_length=20, blank=True, null=True)
    third = models.CharField(max_length=20, blank=True, null=True)
    last = models.CharField(max_length=20, blank=True, null=True)
    pid = models.IntegerField(blank=True, null=True)
    partner = models.CharField(max_length=20, blank=True, null=True)
    img = models.IntegerField(blank=True, null=True)
    family = models.ForeignKey(Family, on_delete=models.CASCADE)

    def __str__(self):
        return self.id

    class Meta:
        ordering = ['id']


class AccessRecord(models.Model):
    name = models.ForeignKey(PersonData, on_delete=models.DO_NOTHING)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.date


class UserProfileInfo(models.Model):

    family = models.ForeignKey(Family, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    # profile_pic = models.ImageField(upload_to='profile_pics', blank=True) Cannot use ImageField because Pillow is not installed.

    def __str__(self):
        return self.user.username

    class Meta:
        unique_together = ('family', 'user')
