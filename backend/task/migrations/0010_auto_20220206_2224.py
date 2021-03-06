# Generated by Django 3.2.9 on 2022-02-06 21:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('task', '0009_auto_20220206_1919'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='buildinevidence',
            name='name',
        ),
        migrations.RemoveField(
            model_name='buildinevidence',
            name='note',
        ),
        migrations.RemoveField(
            model_name='uploadedevidence',
            name='name',
        ),
        migrations.RemoveField(
            model_name='buildinevidence',
            name='preparer',
        ),
        migrations.AddField(
            model_name='buildinevidence',
            name='preparer',
            field=models.ForeignKey(blank=True, limit_choices_to={'is_staff': True, 'is_superuser': False}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='buildin_evidence_preparer', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RemoveField(
            model_name='buildinevidence',
            name='reviewer',
        ),
        migrations.AddField(
            model_name='buildinevidence',
            name='reviewer',
            field=models.ForeignKey(blank=True, limit_choices_to={'is_staff': False, 'is_superuser': True}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='buildin_evidence_reviewer', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RemoveField(
            model_name='uploadedevidence',
            name='preparer',
        ),
        migrations.AddField(
            model_name='uploadedevidence',
            name='preparer',
            field=models.ForeignKey(blank=True, limit_choices_to={'is_staff': True, 'is_superuser': False}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='uploaded_evidence_preparer', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RemoveField(
            model_name='uploadedevidence',
            name='reviewer',
        ),
        migrations.AddField(
            model_name='uploadedevidence',
            name='reviewer',
            field=models.ForeignKey(blank=True, limit_choices_to={'is_staff': False, 'is_superuser': True}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='uploaded_evidence_reviewer', to=settings.AUTH_USER_MODEL),
        ),
    ]
