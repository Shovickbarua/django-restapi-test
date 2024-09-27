from rest_framework import serializers
from .models import ScrapeHistory

class ScrapeHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ScrapeHistory
        fields = ['url', 'emails', 'scraped_at']