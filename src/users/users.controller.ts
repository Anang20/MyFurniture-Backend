import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAlamatDto } from './dto/create-alamat.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const result = await this.usersService.findAll();

    return {
      result,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get('cari_alamat/:id_user')
  async findAllAlamat(@Param('id_user', ParseUUIDPipe) id_user: string) {
    return {
      data: await this.usersService.findAlamat(id_user),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get('cari_user/:id_user')
  async findOne(@Param('id_user', ParseUUIDPipe) id_user: string) {
    return {
      data: await this.usersService.findOne(id_user),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get('/provinsi/provinsi')
  async cariProvinsi() {
    return {
      data: await this.usersService.findProvinsi(),
    };
  }

  @Get('/kota/:id_provinsi')
  async cariKota(@Param('id_provinsi') id_provinsi: number) {
    return {
      data: await this.usersService.findKota(id_provinsi),
    };
  }

  @Get('/kecamatan/:id_kota')
  async cariKecamatan(@Param('id_kota') id_kota:number) {
    return {
      data: await this.usersService.findKecamatan(id_kota),
    };
  }

  @Get('/kelurahan/:id_kecamatan')
  async cariKelurahan(@Param('id_kecamatan') id_kecamatan: number) {
    return {
      data: await this.usersService.findKelurahan(id_kecamatan),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id_user')
  async update(
    @Param('id_user', ParseUUIDPipe) id_user: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return {
      data: await this.usersService.update(id_user, updateUserDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id_user')
  async remove(@Param('id_user', ParseUUIDPipe) id_user: string) {
    await this.usersService.remove(id_user);
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Post('create_alamat')
  async createAlamat(@Body() createAlamatDto: CreateAlamatDto) {
    return {
      data: await this.usersService.createAlamat(createAlamatDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }
  @Get('carialamat/:id_user')
  async findAlamat(@Param('id_user', ParseUUIDPipe) id_user: string) {
    return {
      data: await this.usersService.findAlamat(id_user),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
