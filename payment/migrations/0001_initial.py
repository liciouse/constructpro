# Generated by Django 5.2 on 2025-04-10 08:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('project', '0003_alter_task_status'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('payment_date', models.DateField()),
                ('method', models.CharField(max_length=50)),
                ('payee', models.ForeignKey(blank=True, limit_choices_to={'user_type': 'contractor'}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='payments_received', to=settings.AUTH_USER_MODEL)),
                ('payer', models.ForeignKey(blank=True, limit_choices_to={'user_type': 'client'}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='payments_made', to=settings.AUTH_USER_MODEL)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.project')),
            ],
        ),
    ]
