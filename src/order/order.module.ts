import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { managementOngkir } from './entities/management-ongkir.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, managementOngkir])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
