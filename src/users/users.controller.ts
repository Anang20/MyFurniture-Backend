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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAlamatDto } from './dto/create-alamat.dto';
import { Alamat } from './entities/alamat.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

const path = require('path');

export const storage = {
  storage: diskStorage({
    destination: './public/img/profile',
    filename: (req, file, callback) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      callback(null, `${filename}${extension}`)
    },
  })
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      data: await this.usersService.create(createUserDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

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

  @Get(':id_user')
  async findOne(@Param('id_user', ParseUUIDPipe) id_user: string) {
    return {
      data: await this.usersService.findOne(id_user),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id_user')
  async update(
    @Param('id_user', ParseUUIDPipe) id_user: string, 
    @Body() updateUserDto: UpdateUserDto) {
      return {
        data: await this.usersService.update(id_user, updateUserDto),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
  }

  @Put('edit/foto/a')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('foto', storage))
  async updateFoto(
    @Request() req,
    @UploadedFile() foto: Express.Multer.File,
  ) { 
        
    console.log(foto.filename);
    
    return {
      data: await this.usersService.updateFoto(
        req.user.id_user,
        foto.filename,
      ),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get('get_foto_profil/:foto/')
  async getFoto(@Param('foto') foto, @Res() res) {
    return await res.sendFile(foto, { root: './public/img/profile' });
  }

  // async update(
  //   @Param('id_user', ParseUUIDPipe) id_user: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return {
  //     data: await this.usersService.update(id_user, updateUserDto),
  //     statusCode: HttpStatus.OK,
  //     message: 'success',
  //   };
  // }

  @Delete(':id_user')
  async remove(@Param('id_user', ParseUUIDPipe) id_user: string) {
    await this.usersService.remove(id_user);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @Put('upload')
  // @UseInterceptors(FileInterceptor('foto', storage))
  // uploadFile(@UploadedFile() file, @Request() req): Observable<object>{ 
  //   const user : User = req.user;
  //   console.log(user);

  //   return of({imagePath: file.filename});
    
  // }

  @Post('create_alamat/:id_user')
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

