import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cartDetail } from './entities/cart-detail.entity';
import { ProdukModule } from 'src/produk/produk.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, cartDetail]), ProdukModule],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {}
