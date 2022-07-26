import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Produk } from 'src/produk/entity/produk.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Produk])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
