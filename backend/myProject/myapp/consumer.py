'''
import pika 
#from .database_operations import insert_data
#from .models import Message

def callback(ch, method, properties, body):
    message = body.decode('utf-8')

    #insert_data(message)
    print(f"Received message: {body}")




def consume_messages():
    credentials = pika.PlainCredentials('admin', 'admin')
    connection = pika.BlockingConnection(pika.ConnectionParameters('192.168.192.211', 5672, '/', credentials))

    channel = connection.channel()
    exchange_name = 'custom_direct'
    queue_name = 'backend_queue'
    queue_f = 'frontendQueue'


    channel.exchange_declare(exchange=exchange_name, exchange_type='direct', durable=False)
    channel.queue_declare(queue=queue_name, durable=False)
    channel.queue_declare(queue=queue_f, durable=False) #frontend 
    channel.queue_bind(exchange=exchange_name, queue=queue_f) 
    channel.queue_bind(exchange=exchange_name, queue=queue_name)

    channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True) #backend_queue consume
    channel.basic_consume(queue=queue_f, on_message_callback=callback, auto_ack=True) #frontend_queue consume
    

    print("Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()

def insert_data(message):
    Message.objects.create(column1=message)

if __name__ == "__main__":
    consume_messages()
'''

import pika 


def callback(ch, method, properties, body):
    print(f"Received message: {body}")




def consume_messages():
    credentials = pika.PlainCredentials('admin', 'admin')
    connection = pika.BlockingConnection(pika.ConnectionParameters('192.168.192.211', 5672, '/', credentials))

    channel = connection.channel()
    exchange_name = 'custom_direct'
    queue_name = 'backend_queue'
    #queue_f = 'frontend_queue'


    channel.exchange_declare(exchange=exchange_name, exchange_type='direct', durable=False)
    channel.queue_declare(queue=queue_name, durable=False)
    #channel.queue_declare(queue=queue_f, durable=False) #frontend 
    #channel.queue_bind(exchange=exchange_name, queue=queue_f) 
    channel.queue_bind(exchange=exchange_name, queue=queue_name)

    channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True) #backend_queue consume
   #channel.basic_consume(queue=queue_f, on_message_callback=callback, auto_ack=True) #frontend_queue consume
    

    print("Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()

if __name__ == "__main__":
    consume_messages()
