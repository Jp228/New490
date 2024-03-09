// RabbitMQService.js
import { Connection, Exchange, Queue } from 'amqp-ts';

class RabbitMQService {
  constructor() {
    this.connection = new Connection({
      host: '192.168.192.1',
      port: 5672,
      username: 'guest',
      password: 'guest',
    });

    this.exchange = this.connection.declareExchange('exchangeName', 'direct', { durable: false });
    this.queue = this.connection.declareQueue('frontendQueue');
    this.queue.bind(this.exchange);
  }

  sendMessage(message) {
    const routingKey = 'frontend';
    const msg = { data: message };
    this.exchange.send(msg, routingKey);
  }
}

export default new RabbitMQService();
