from .base import *

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '192.168.0.10']

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',    
]


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
<<<<<<< HEAD
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
      # 'USER': 'kirito',
        #'PASSWORD': 'sharingan',
       # 'HOST': '127.0.0.1',
        #'PORT': '3306'
=======
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django_react',
        'USER': 'kirito',
        'PASSWORD': 'sharingan',
        'HOST': '10.0.2.2',
        'PORT': '3306',
	'OPTIONS': {
		'sql_mode': 'STRICT_TRANS_TABLES'	
	}
>>>>>>> 879f4ce2120f54f3c070ea9ccddfba7f51327d25
    }
}

#   PAYU Payment Details
PAYU_MERCHANT_KEY = "he4oxBcf",
PAYU_MERCHANT_SALT = "7VEvvyfTg7",
PAYU_MODE = "TEST"

