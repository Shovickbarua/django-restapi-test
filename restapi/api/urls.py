from django.urls import path
from . import views

urlpatterns = [
    # path('', views.getData),
    # path('/add', views.addItem),
    path('scrape/', views.scrape_url),
    path('history/', views.get_scrape_history),
]