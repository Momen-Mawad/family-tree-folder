# Generated by Django 3.2.16 on 2023-01-18 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('family_tree', '0006_alter_person_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to=None, verbose_name='Image'),
        ),
    ]