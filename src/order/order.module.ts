import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { managementOngkir } from './entities/management-ongkir.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { Alamat } from 'src/users/entities/alamat.entity';
import { User } from 'src/users/entities/user.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { cartDetail } from 'src/cart/entities/cart-detail.entity';
import { Produk } from 'src/produk/entities/produk.entity';
import { Role } from 'src/users/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, managementOngkir, Alamat, User, Cart, cartDetail, Produk, Role]), UsersModule],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
