# Generated by Django 5.0.6 on 2024-06-19 10:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('form_app', '0006_productiondata_created_at_productiondata_updated_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='shellinspection',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
    ]