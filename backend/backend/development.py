from .base import *

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',    
]


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django_react',
        'USER': 'kirito',
        'PASSWORD': 'sharingan',
        'HOST': '127.0.0.1',
        'PORT': '3306'
    }
}

#   PAYU Payment Details
PAYU_MERCHANT_KEY = "he4oxBcf",
PAYU_MERCHANT_SALT = "7VEvvyfTg7",
PAYU_MODE = "TEST"

