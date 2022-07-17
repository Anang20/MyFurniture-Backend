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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    const [data, count] = await this.usersService.findAll();

    return {
      data,
      count,
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

  @Put(':id_user')
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
}
