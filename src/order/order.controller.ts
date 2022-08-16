import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UpdateOngkirDto } from './dto/updateOngkir.dto';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService : OrderService
    ){}

    @Post('buatOngkir')
    async updateOngkir(@Body() updateOngkirDto : UpdateOngkirDto){
        return {
            data: await this.orderService.updateOngkir(updateOngkirDto),
            statusCode: HttpStatus.OK,
            massage : 'success'
        }
    }

    @Post('ongkir/:id_alamat_user')
    async createOngkirTotal(
        @Param('id_alamat_user', ParseUUIDPipe) id_alamat_user:string,
    ){
        return {
            data: await this.orderService.createOngkirTotal(id_alamat_user),
            statusCode: HttpStatus.CREATED,
            massage : 'success'
        }
    }

    @Get('/total_hrg_produk/:id_cart')
    async totalHargaProduk(@Param('id_cart', ParseUUIDPipe) id_cart: string){
        return {
            data : await this.orderService.totalHargaProduk(id_cart),
            statusCode: HttpStatus.OK
        }
    }

    @Post('/buat/order')
    async createOrder(@Body() createOrder : CreateOrderDto){
        return {
            data : await this.orderService.createOrder(createOrder),
            statusCode : HttpStatus.CREATED,
            massage : "success"
        }
    }
    @Get(':id_user')
    async findOneOrder(@Param('id_user', ParseUUIDPipe) id_user : string){
        return await this.orderService.findOneOrder(id_user)
    }

    @Get('cart/:id_user')
    async findOneCart(@Param('id_user', ParseUUIDPipe) id_user:string){
        return{
            data: await this.orderService.findOneCart(id_user)
        }
    }

    @Get()
    async findAll(){
        return {
            data: await this.orderService.findAll()
        }
    }

    @Put('terima/:id_user')
    async terima(@Param('id_user', ParseUUIDPipe) id_user: string){
        return {
            data: await this.orderService.terima(id_user)
        }
    }

    @Get('excel/generator')
    async exportExcel(){
        return this.orderService.exportExcel()
    }

    @Get('produk/:id_cart')
    async findCart(
        @Param('id_cart', ParseUUIDPipe) id_cart:string
    ){
        return {
            data: await this.orderService.findCart(id_cart)
        }
    }
}