import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { OrderModule } from 'src/order/order.module';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order]), OrderModule ],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
