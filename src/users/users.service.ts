import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlamatDto } from './dto/create-alamat.dto';
import { Alamat } from './entities/alamat.entity';

@Injectable()
export class UsersService {
 
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>, 
    @InjectRepository(Alamat) 
    private alamatRepository: Repository<Alamat> 
  ) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.usersRepository.insert(createUserDto);

    return this.usersRepository.findOneOrFail({
      where: {
        id_user: result.identifiers[0].id_user,
      }
    });
  }
  async createAlamat(createAlamatDto: CreateAlamatDto) {
    const result = await this.alamatRepository.insert(createAlamatDto);

    return this.alamatRepository.findOneOrFail({
      where: {
        id_alamat_user: result.identifiers[0].id_alamat_user,
      }
    });
  }

  findAll() {
    return this.usersRepository.findAndCount();
  }

  findAllAlamat(){
    return this.alamatRepository.findAndCount()
  }
 
  async findOne(id_user: string) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          id_user,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }
  async findAlamat(id_alamat_user: string) {
    try {
      return await this.alamatRepository.findOneOrFail({
        where: {
          id_alamat_user,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  async update(id_user: string, updateUserDto: UpdateUserDto) {
    try {
      await this.usersRepository.findOneOrFail({
        where: {
          id_user,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    await this.usersRepository.update(id_user, updateUserDto);

    return this.usersRepository.findOneOrFail({
      where: {
        id_user,
      },
    });
  }

  async remove(id_user: string) {
    try {
      await this.usersRepository.findOneOrFail({
        where: {
          id_user,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    await this.usersRepository.delete(id_user);
  }
}
