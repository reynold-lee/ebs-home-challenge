from django.contrib import admin
from django.urls import path, re_path, include
from items import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/items/$', views.items_list),
    re_path(r'^api/items/(?P<id>[0-9]+)/$', views.item_detail),
]
