from django.contrib import admin
from . import models

# Register your models here.


class UserProfileInfoInLine(admin.TabularInline):
    model = models.UserProfileInfo


admin.site.register(models.Family)

