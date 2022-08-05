import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateOngkirDto } from './dto/createOngkir.dto';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService : OrderService
    ){}

    @Get()
    async createDefaultOngkir(@Body() createOngkir : CreateOngkirDto){
        return {
            data: await this.orderService.createDefaultOngkir(createOngkir),
            statusCode: HttpStatus.CREATED,
            massage : 'success'
        }
    }
    @Post(':id_alamat')
    async createOngkirTotal(
        @Param('id_alamat', ParseUUIDPipe) id_alamat:string,
    ){
        return {
            data: await this.orderService.createOngkirTotal(id_alamat),
            statusCode: HttpStatus.CREATED,
            massage : 'success'
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
