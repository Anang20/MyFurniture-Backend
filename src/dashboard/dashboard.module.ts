import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Payment } from 'src/payment/entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Produk } from 'src/produk/entities/produk.entity';
import { Role } from 'src/users/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Produk, User, Role])],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule {}
