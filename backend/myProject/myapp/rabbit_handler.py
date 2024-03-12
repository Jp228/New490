import pika

def write_to_queue(message):
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.queue_declare(queue='write_queue')
    channel.basic_publish(exchange='', routing_key='write_queue', body=message)

    connection.close()

def read_from_queue():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.queue_declare(queue='read_queue')
    method_frame, header_frame, body = channel.basic_get(queue='read_queue')

    if method_frame:
        message = body.decode('utf-8')
        # Process the message as needed
        print(f"Received from the read_queue: {message}")

    connection.close()