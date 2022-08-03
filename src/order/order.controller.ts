import { Body, Controller, Get, HttpStatus } from '@nestjs/common';
import { CreateOngkirDto } from './dto/createOngkir.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService : OrderService
    ){}

    @Get()
    async createOngkir(@Body() createOngkir : CreateOngkirDto){
        return {
            data: await this.orderService.createOngkir(createOngkir),
            statusCode: HttpStatus.CREATED,
            massage : 'success'
        }
    }

}
