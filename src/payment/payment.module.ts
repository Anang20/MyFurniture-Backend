import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { OrderModule } from 'src/order/order.module';
import { Order } from 'src/order/entities/order.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { cartDetail } from 'src/cart/entities/cart-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order, Cart, cartDetail]), OrderModule ],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
