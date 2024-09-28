from django.urls import path
from . import views

urlpatterns = [
    # path('', views.getData),
    # path('/add', views.addItem),
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('scrape/', views.scrape_url),
    path('history/', views.get_scrape_history),
]