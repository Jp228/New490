import pika

# RabbitMQ connection parameters
rabbitmq_host = '192.168.192.211'
rabbitmq_port = 5672
rabbitmq_user = 'admin'
rabbitmq_password = 'admin'
rabbitmq_request_queue = 'command_queue'
rabbitmq_response_queue = 'response_queue'

def send_command_to_mysql(command):
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_host, port=rabbitmq_port,
                                                                   credentials=pika.PlainCredentials(username=rabbitmq_user,
                                                                                                     password=rabbitmq_password)))
    channel = connection.channel()
    channel.queue_declare(queue=rabbitmq_request_queue)
    channel.queue_declare(queue=rabbitmq_response_queue)

    # Publish a command message
    channel.basic_publish(exchange='', routing_key=rabbitmq_request_queue, body=command)
    print("Command sent to RabbitMQ:", command)

    # Wait for the response
    def callback(ch, method, properties, body):
        print("Received from RabbitMQ:", body.decode())
        # Process the response here

    channel.basic_consume(queue=rabbitmq_response_queue, on_message_callback=callback, auto_ack=True)
    print('Waiting for response from RabbitMQ...')
    channel.start_consuming()

if __name__ == "__main__":
    send_command_to_mysql("INSERT INTO `account`(`name`, `ucid_id`, `email`) VALUES ('Jay Pstel','jkp9','jkp9@njit.edu')")