import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart-detail.dto';
import { UpdateCartDto } from './dto/update-cart-detail.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':id_produk/:id_user')
  async createCart(
    @Param('id_produk', ParseUUIDPipe) id_produk: string,
    @Param('id_user', ParseUUIDPipe) id_user: string,
    @Body() createCartDto: CreateCartDto,
  ) {
    return {
      data: await this.cartService.createCart(
        id_produk,
        id_user,
        createCartDto,
      ),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get(':id_user')
  async getCart(@Param('id_user', ParseUUIDPipe) id_user: string){
    return {
        data: await this.cartService.findCart(id_user)
    }
  };

  @Put(':id_cart')
  async update(
    @Param('id_cart', ParseUUIDPipe) id_cart: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return {
      data: await this.cartService.update(id_cart, updateCartDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
  @Delete(':id_cart')
  async remove(@Param('id_cart') id_cart: string) {
    await this.cartService.remove(id_cart);
    return {
      statusCode: HttpStatus.OK,
      massage: 'Deleted',
    };
  }
}
