import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(createPaymentDto: CreatePaymentDto) {
    return {
      data: await this.paymentService.createPayment(createPaymentDto),
      statusCode: HttpStatus.CREATED,
      massage: 'success',
    };
  }
}
