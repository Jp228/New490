from django.shortcuts import render
from .models import Message
# Create your views here.
# views.py
from django.http import JsonResponse
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pika
import json

def my_view(request):
    return HttpResponse("Hello, this is my custom view.")


def send_message_to_rabbitmq(request):
    try:
        
        # Update the RabbitMQ server address and port
        credentials = pika.PlainCredentials('admin', 'admin')
        connection = pika.BlockingConnection(pika.ConnectionParameters('192.168.192.211', 5672, '/', credentials))#192.168.192.211 jay_rabbitmq
        channel = connection.channel()
        
        # Declare a non-durable exchange with a different name
        exchange_name = 'custom_direct'
        channel.exchange_declare(exchange=exchange_name, exchange_type='direct', durable=False)
        
        # Declare a queue
        queue_name = 'backend_queue'
        channel.queue_declare(queue=queue_name, durable=False)
        channel.queue_bind(exchange='custom_direct', queue=queue_name, routing_key='your_routing_key')
        channel.basic_publish(exchange=exchange_name, routing_key=queue_name, body=request)

        connection.close()

        return JsonResponse({'status': 'Message sent to RabbitMQ'})
    except Exception as e:
        print(f'Error sending message to RabbitMQ: {str(e)}')
        return JsonResponse({'error': f'Error sending message to RabbitMQ: {str(e)}'})

# Your Django view to send a "Hello" message to RabbitMQ
def send_hello_message(request):
    message = 'Hello from backend'
    return send_message_to_rabbitmq(json.dumps(message))



