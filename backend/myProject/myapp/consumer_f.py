
import pika
from django.conf import settings

def callback(ch, method, properties, body):
    print("Received %r" % body)
    # Here you can process the message, for example, save it to your Django model

def start_consumer():
    # Setup connection parameters based on your RabbitMQ configuration
    credentials = pika.PlainCredentials('admin', 'admin')  # Use your credentials
    parameters = pika.ConnectionParameters('192.168.192.211',
                                           5672,  # Default port for RabbitMQ
                                           '/',
                                           credentials)

    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    # This queue name should match the one used in your frontend
    queue_name = 'frontendQueue'

    channel.queue_declare(queue=queue_name, durable=True)
    channel.basic_consume(queue=queue_name,
                          auto_ack=True,
                          on_message_callback=callback)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == "__main__":
    start_consumer()