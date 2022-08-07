import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlamatDto } from './dto/create-alamat.dto';
import { Alamat } from './entities/alamat.entity';
import { Kelurahan } from './entities/kelurahan.entity';
import { CartService } from 'src/cart/cart.service';
import { string } from 'joi';

@Injectable()
export class UsersService {
 
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>, 
    @InjectRepository(Alamat) 
    private alamatRepository: Repository<Alamat>,
    @InjectRepository(Kelurahan)
    private kelurahanRepository: Repository<Kelurahan>,
    private cartService: CartService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.usersRepository.insert(createUserDto);
    const data = await this.usersRepository.findOneOrFail({
      where: {
        id_user: result.identifiers[0].id_user,
      }, relations: ['kelurahan', 'kelurahan.kecamatan', 'kelurahan.kota', 'kelurahan.provinsi' ]
    });
   
    return data
  }
  async createAlamat(createAlamatDto: CreateAlamatDto) {

    const user = await this.usersRepository.findOneOrFail({where: { id_user: createAlamatDto.id_user}})
    const alamat =  new Alamat()
    // alamat.kelurahan = await this.kelurahanRepository.findOneOrFail({ where : {id_kelurahan: createAlamatDto.id_kelurahan}})
    alamat.alamat = createAlamatDto.alamat
    alamat.user = user
    alamat.longtitude = createAlamatDto.longtitude
    alamat.latitude = createAlamatDto.latitude
    const result = await this.alamatRepository.save(alamat);

    return this.alamatRepository.findOneOrFail({
      where: {
        id_alamat_user: result.id_alamat_user,
      }
    });
  }

 async findAll() {
    const data = await this.usersRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.role', 'role').getMany()
    return data
  }

  async findOne(id_user: string) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          id_user : id_user,
        },
        relations : {
          role : true,
        }
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
  async findAlamat(id_user: string) {
    try {
      const data = await this.usersRepository.findOneOrFail({
        where: {
          id_user,
        },
        relations : {
          alamat:true
        }
    });
    return data.alamat
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

  async updateFoto(id_user: string, foto) {
    try {
      await this.usersRepository.findOneOrFail({
        where: {
          id_user,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException (
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
    return await this.usersRepository.update(id_user, {foto});
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
