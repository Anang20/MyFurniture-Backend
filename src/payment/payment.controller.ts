import { Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
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
  @Get()
  async findAll(){
    return {
      data: await this.paymentService.findAll(),
      statusCode: HttpStatus.OK,
      massage: 'success',
    }
  }

  @Delete('delete/:id_payment')
  async remove(@Param('id_payment', ParseUUIDPipe) id_payment: string){
    await this.paymentService.remove(id_payment)
    return {
      tatusCode: HttpStatus.OK,
      massage: 'success',
    }
  }

  @Put(':id_payment')
  async approve(@Param('id_payment', ParseUUIDPipe) id_payment: string){
    return {
      data: await this.paymentService.acc(id_payment),
      tatusCode: HttpStatus.OK,
      massage: 'success',
    }
  }
}
