#!/bin/bash

python3 manage.py migrate

python3 manage.py runserver 192.168.192.211:7007
