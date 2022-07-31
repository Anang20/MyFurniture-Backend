import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { managementOngkir } from './entities/management-ongkir.entity';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, managementOngkir, Payment])],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
