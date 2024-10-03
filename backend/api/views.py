from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from bs4 import BeautifulSoup
from .models import ScrapeHistory
from .serializers import UserRegistrationSerializer, UserLoginSerializer, ScrapeHistorySerializer
import requests
import re
from django.contrib.auth import login
# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": serializer.data,
            "token": token.key
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        login(request, user) 
        return Response({
            "token": token.key,
            "username": user.username
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def scrape_url(request):
    url = request.data.get('url')
    if not url:
        return Response({"error": "URL is required."}, status=400)

    try:
        response = requests.get(url)
        response.raise_for_status()  
        soup = BeautifulSoup(response.text, 'html.parser')
        emails = set(re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", soup.text))
        ScrapeHistory.objects.create(user=request.user, url=url, emails=", ".join(emails))
        return Response({'emails': list(emails)})

    except requests.exceptions.RequestException as e:
        return Response({"error": f"Failed to scrape the URL: {str(e)}"}, status=400)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_scrape_history(request):
    history = ScrapeHistory.objects.filter(user=request.user)
    serializer = ScrapeHistorySerializer(history, many=True)
    return Response(serializer.data)
