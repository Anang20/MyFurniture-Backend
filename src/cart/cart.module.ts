import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdukModule } from 'src/produk/produk.module';
import { User } from 'src/users/entities/user.entity';
import { Cart } from './entities/cart-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User]), ProdukModule],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {}
