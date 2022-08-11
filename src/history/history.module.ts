import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Order])],
  providers: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule {}
