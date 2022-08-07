import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { managementOngkir } from './entities/management-ongkir.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Alamat } from 'src/users/entities/alamat.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { cartDetail } from 'src/cart/entities/cart-detail.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, managementOngkir, Alamat, Cart, cartDetail, User])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
