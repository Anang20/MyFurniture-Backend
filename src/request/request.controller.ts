import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateRequestDto } from './dto/createRequest.dto';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
    constructor(
        private readonly requestService: RequestService
    ){}

    @Post(':id_user')
    async createRequest(
        @Param('id_user', ParseUUIDPipe) id_user: string,
        @Body() createRequestDto: CreateRequestDto){
        return{
            data: await this.requestService.createRequest(id_user, createRequestDto),
            statusCode: HttpStatus.CREATED,
            message: 'success',
        }
    }

    @Get()
    async findAll(){
        return{
            data: await this.requestService.findAll(),
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
