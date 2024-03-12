#!/bin/bash

pid=$(ps aux | grep 'python3 manage.py runserver' | grep -v grep | awk '{print $2}')

if [ -n "$pid" ]; then
    echo "stopping Django server..."
    kill -TERM "$pid"
    echo "Django development server stopped."
else
    echo "Django development server is not running"
fi