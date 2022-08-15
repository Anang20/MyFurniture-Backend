import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { generateString, InjectRepository } from '@nestjs/typeorm';
import { CreateAlamatDto } from './dto/create-alamat.dto';
import { Alamat } from './entities/alamat.entity';
import { Kelurahan } from './entities/kelurahan.entity';
import { CartService } from 'src/cart/cart.service';
import { string } from 'joi';
import { hashPassword } from 'src/helper/hash_password';
import { Provinsi } from './entities/provinsi.entity';
import { Kota } from './entities/kota.entity';
import { Kecamatan } from './entities/kecamatan.entity';

@Injectable()
export class UsersService {
 
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>, 
    @InjectRepository(Alamat) 
    private alamatRepository: Repository<Alamat>,
    @InjectRepository(Kelurahan)
    private kelurahanRepository: Repository<Kelurahan>,
    @InjectRepository(Provinsi)
    private provinsiRepository: Repository<Provinsi>,
    @InjectRepository(Kota)
    private kotaRepository: Repository<Kota>,
    @InjectRepository(Kecamatan)
    private kecamatanRepository: Repository<Kecamatan>,
  ) {}

  async findProvinsi(){
    return await this.provinsiRepository.findAndCount()
  }

  async findKota(id_provinsi: number){
    return await this.provinsiRepository.find({
      where:{
        id_provinsi: id_provinsi
      }, relations : ['kota']
    })
  }

  async findKecamatan(id_kota: number){
    return await this.kotaRepository.find({
      where:{
        id_kota: id_kota
      },
      relations: ['kecamatan']
    })
  }

  async findKelurahan(id_kecamatan: number){
    return await this.kecamatanRepository.find({
      where:{
        id_kecamatan: id_kecamatan
      },
      relations: ['kelurahan']
    })
  }
  
  async createAlamat(createAlamatDto: CreateAlamatDto) {
    const user = await this.usersRepository.findOneOrFail({
      where: { 
        id_user: createAlamatDto.id_user
      },
    })
    const alamat =  new Alamat()
    alamat.kelurahan = await this.kelurahanRepository.findOneOrFail({ where : {id_kelurahan: createAlamatDto.id_kelurahan}})
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
      const user = await this.usersRepository.findOneOrFail({
        where: {
          id_user,
        },
        relations : ['alamat']
    });
    const nama_lengkap = user.nama_lengkap
    const no_telp = user.no_telp
    const alamat = user.alamat
    return {
      nama_lengkap: nama_lengkap,
      no_telp: no_telp,
      alamat: alamat
    }
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
    const salt = generateString()
    const password = await hashPassword(updateUserDto.password, salt)
    const hasil = await this.usersRepository.findOneOrFail({
      where: {
        id_user: id_user
      }
    })
    hasil.nama_lengkap = updateUserDto.nama_lengkap
    hasil.foto = updateUserDto.foto
    hasil.email = updateUserDto.email
    hasil.no_telp = updateUserDto.no_telp
    hasil.salt = salt
    hasil.password = password
    await this.usersRepository.save(hasil);
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
  
  async removeAlamat(id_alamat:string){
    try {
     const alamat = await this.alamatRepository.findOneOrFail({
        where: {
          id_alamat_user:id_alamat,
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

    await this.alamatRepository.delete(id_alamat);
  }
}
