"""
URL configuration for myProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
'''
from django.contrib import admin
from django.urls import path
from myapp.views import my_view
from myapp.views import send_hello_message

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myapp/my_view', my_view, name='my_view'),
    path('myapp/sendMessage', send_hello_message, name='send_hello_message'),
    path('myapp/sendMessageFromFront', send_message_to_rabbitmq, name='send_message_to_rabbitmq'),
]
'''
"""
URL configuration for myProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path, include
from myapp.views import my_view
from myapp.views import send_hello_message
from myapp.views import send_message_to_rabbitmq
urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', include('url')),
    path('myapp/my_view', my_view, name='my_view'),
    path('myapp/sendMessage', send_hello_message, name='send_hello_message'),
    path('myapp/sendMessageFromFront', send_message_to_rabbitmq, name='send_message_to_rabbitmq'),
]



