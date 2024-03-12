import pika
# RabbitMQ connection parameters
rabbitmq_host = '192.168.192.211'
rabbitmq_port = 5672
rabbitmq_user = 'admin'
rabbitmq_password = 'admin'
rabbitmq_queue = 'data_queue'

def process_message(ch, method, properties, body):
    # Process the message received from RabbitMQ
    print("Received from RabbitMQ:", body.decode())

def consume_from_rabbitmq():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_host, port=rabbitmq_port,
                                                                   credentials=pika.PlainCredentials(username=rabbitmq_user,
                                                                                                     password=rabbitmq_password)))
    channel = connection.channel()
    channel.queue_declare(queue=rabbitmq_queue)
    channel.basic_consume(queue=rabbitmq_queue, on_message_callback=process_message, auto_ack=True)
    print('Waiting for messages from RabbitMQ...')
    channel.start_consuming()

if __name__ == "__main__":
    consume_from_rabbitmq()