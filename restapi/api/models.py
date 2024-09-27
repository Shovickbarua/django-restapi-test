from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ScrapeHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    url = models.URLField()
    emails = models.TextField()
    scraped_at = models.DateTimeField(auto_now_add=True)