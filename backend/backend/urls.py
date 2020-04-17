"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, re_path
from django.conf.urls import url, include
from core.views import ItemListView, AddtoCartView, OrderDetailView
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^product-list/', ItemListView.as_view(), name='product-list'),
    url(r'^add-to-cart/', AddtoCartView.as_view(), name='add-to-cart'),
    url(r'^order-summary/', OrderDetailView.as_view(), name='add-to-cart'),
    url(r'^', include('django.contrib.auth.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

if not settings.DEBUG:
    urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html')),]