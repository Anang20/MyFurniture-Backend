import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateRequestDto } from './dto/createRequest.dto';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
    constructor(
        private readonly requestService: RequestService
    ){}

    @Post()
    async createRequest(@Body() createRequestDto: CreateRequestDto){
        return{
            data: this.requestService.createRequest(createRequestDto),
            statusCode: HttpStatus.CREATED,
            message: 'success',
        }
    }

    @Get()
    async findAll(){
        return{
            data: this.requestService.findAll(),
            statusCode: HttpStatus.OK,
            message: 'success',
        }
    }

    @Delete(':id_request')
    async remove(@Param('id_request') id_request:number){
        await this.requestService.remove(id_request);
        return {
          statusCode: HttpStatus.OK,
          message: 'success',
        };
    }
}
