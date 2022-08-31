import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UpdateOngkirDto } from './dto/updateOngkir.dto';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('buatOngkir')
  async updateOngkir(@Body() updateOngkirDto: UpdateOngkirDto) {
    return {
      data: await this.orderService.updateOngkir(updateOngkirDto),
      statusCode: HttpStatus.OK,
      massage: 'success',
    };
  }

  @Post('ongkir/:id_alamat_user')
  async createOngkirTotal(
    @Param('id_alamat_user', ParseUUIDPipe) id_alamat_user: string,
  ) {
    return {
      data: await this.orderService.createOngkirTotal(id_alamat_user),
      statusCode: HttpStatus.CREATED,
      massage: 'success',
    };
  }

  @Get('/total_hrg_produk/:id_user')
  async totalHargaProduk(@Param('id_user', ParseUUIDPipe) id_user: string) {
    return {
      data: await this.orderService.totalHargaProduk(id_user),
      statusCode: HttpStatus.OK,
    };
  }

  @Post('/buat/order')
  async createOrder(@Body() createOrder: CreateOrderDto) {
    return {
      data: await this.orderService.createOrder(createOrder),
      statusCode: HttpStatus.CREATED,
      massage: 'success',
    };
  }
  @Get(':id_user')
  async findOrderByIdUser(@Param('id_user', ParseUUIDPipe) id_user: string) {
    return await this.orderService.findOrderByUser(id_user);
  }

  @Get()
  async findAll() {
    return {
      data: await this.orderService.findAll(),
    };
  }

  @Put('terima/:id_order')
  async terima(@Param('id_order') id_order: number) {
    return {
      data: await this.orderService.terima(id_order),
    };
  }
  @Get('cari/cari_laporan')
  async cariLaporan() {
    return await this.orderService.cariLaporan();
  }

  @Get('excel/generator')
  async exportExcel() {
    try {
      return await this.orderService.exportExcel();
    } catch (error) {
      return 'terdapat kesalahan saat membuat excel';
    }
  }

  @Get('export/excel-generator')
  async downloadExcel(@Res() res: any) {
    try {
      return await res.download(
        `./uploads/export/${await this.exportExcel()}`,
        'laporan.xlsx',
      );
    } catch (error) {
      return 'ada kesalahan dalam mendowload excel';
    }
  }

  @Get('order/:id_order')
  async findByPaymnet(@Param('id_order') id_order: number){
    return await this.orderService.findByOrder(id_order)
  }
}
