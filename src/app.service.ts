import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('Payment_Service') private readonly client: ClientProxy,
  ) {}

  async paymentStatus(body) {
    if (Math.random() > 0.5) {
      this.client.emit('payment_done', body);
      setTimeout(() => {
        this.client.emit('deliver_product', body);
      }, 5000);
    } else {
      this.client.emit('payment_reject', body);
    }
  }
}
