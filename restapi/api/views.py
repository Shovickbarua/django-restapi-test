from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from bs4 import BeautifulSoup
from .models import ScrapeHistory
from .serializers import ScrapeHistorySerializer
import requests
import re
# Create your views here.

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def scrape_url(request):
    url = request.data.get('url')
    if not url:
        return Response({"error": "URL is required."}, status=400)

    try:
        response = requests.get(url)
        response.raise_for_status()  # Ensure the request was successful
        soup = BeautifulSoup(response.text, 'html.parser')
        emails = set(re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", soup.text))
        # Save the request history here
        # Assuming you have a ScrapeHistory model as shown below
        ScrapeHistory.objects.create(user=request.user, url=url, emails=", ".join(emails))
        return Response({'emails': list(emails)})

    except requests.exceptions.RequestException as e:
        return Response({"error": f"Failed to scrape the URL: {str(e)}"}, status=400)
    
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_scrape_history(request):
    history = ScrapeHistory.objects.filter(user=request.user)
    serializer = ScrapeHistorySerializer(history, many=True)
    return Response(serializer.data)
