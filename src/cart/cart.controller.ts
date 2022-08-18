import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CartService } from './cart.service';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';

@Controller('cart')
export class CartController {
    constructor (private readonly cartService: CartService) {}

    @Post(':id_produk/:id_cart')
    async createCartDetail(
        @Param('id_produk', ParseUUIDPipe ) id_produk: string,
        @Param('id_cart', ParseUUIDPipe ) id_cart: string,
        @Body() createCartDetailDto : CreateCartDetailDto
        ) {
        return {
            data: await this.cartService.createCartDetail(id_produk, id_cart, createCartDetailDto),
            statusCode: HttpStatus.CREATED,
            message: 'success',
        }
    }

    @Put(':id_cart_detail')
    async update(       
        @Param('id_cart_detail', ParseUUIDPipe ) id_cart_detail: string,
        @Body() updateCartDetailDto : UpdateCartDetailDto
    ){
        return {
            data: await this.cartService.update(id_cart_detail, updateCartDetailDto),
            statusCode: HttpStatus.OK,
            message: 'success',
          };
    }

    // @Get(':id_cart')
    // async findOne(
    //     @Param('id_cart', ParseUUIDPipe ) id_cart: string
    // ){
    //     return {
    //         data: await this.cartService.findOne(id_cart),
    //         statuscode: HttpStatus.OK,
    //         massage: 'succes'
    //     }
    // }
    @Get('cari_cart/:id_user')
    async findOneCart(
        @Param('id_user', ParseUUIDPipe) id_user:string
    ){
        return{
            data: await this.cartService.findOneCart(id_user)
        }
    }
    @Get('cari/:id_user')
    async findOneDetail(
        @Param('id_user', ParseUUIDPipe) id_user:string
    ){
        return{
            data: await this.cartService.findOneDetail(id_user)
        }
    }

    @Get()
    async findCart(){
       return this.cartService.findCart()
    }

    @Delete(':id_cart_detail')
    async remove(@Param('id_cart_detail') id_cart_detail: string){
        await this.cartService.remove(id_cart_detail)
        return {
            statusCode: HttpStatus.OK,
            massage: "Deleted"
        }
    }
}