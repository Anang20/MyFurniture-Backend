import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UpdateOngkirDto } from './dto/updateOngkir.dto';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService : OrderService
    ){}

    @Put('ongkir')
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
            Data: await this.orderService.createOngkirTotal(id_alamat_user),
            statusCode: HttpStatus.CREATED,
            massage : 'success'
        }
    }

    @Get('/total_ongkir/:id_cart')
    async totalHargaProduk(@Param('id_cart', ParseUUIDPipe) id_cart: string){
        return {
            data : await this.orderService.totalHargaProduk(id_cart),
            statusCode: HttpStatus.OK
        }
    }

    @Get()
    async createOrder(@Body() createOrder : CreateOrderDto){
        return {
            data : await this.orderService.createOrder(createOrder),
            statusCode : HttpStatus.CREATED,
            massage : "success"
        }
    }
    

}
