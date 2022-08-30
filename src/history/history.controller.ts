import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async findAll() {
    return {
      data: await this.historyService.findAll(),
    };
  }

  @Get('/order/:id_user')
  async findOne(@Param('id_user', ParseUUIDPipe) id_user: string) {
    return {
      data: await this.historyService.findOne(id_user),
    };
  }

  @Get('produk/:id_order')
  async findOneById(@Param('id_order') id_order: number) {
    return await this.historyService.findById(id_order);
  }
}
