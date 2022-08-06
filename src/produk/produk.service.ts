import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { Produk } from './entities/produk.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProdukService {
  constructor(
    @InjectRepository(Produk)
    private produkRepository: Repository<Produk>,
  ) {}

  async create(createProdukDto: CreateProdukDto, gambar) {

      const result = await this.produkRepository.insert({
        ...createProdukDto,
        gambar,
      });

      return this.produkRepository.findOneOrFail({
        where: {
          id_produk: result.identifiers[0].id_produk,
        },
      });
  }

  findAll() {
    return this.produkRepository.findAndCount();
  }

  async findOne(id_produk: string) {
    try {
      return await this.produkRepository.findOneOrFail({
        where: {
          id_produk,
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

  async update(id_produk: string, updateProdukDto: UpdateProdukDto) {
    try {
      await this.produkRepository.findOneOrFail({
        where: {
          id_produk,
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

    await this.produkRepository.update(id_produk, updateProdukDto);

    return this.produkRepository.findOneOrFail({
      where: {
        id_produk,
      },
    });
  }

  async remove(id_produk: string) {
    try {
      await this.produkRepository.findOneOrFail({
        where: {
          id_produk,
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

    await this.produkRepository.delete(id_produk);
  }

  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<Produk>> {
    return paginate<Produk>(
        this.produkRepository,
        options,
    );
  }

  async paginateFilter(
    options: IPaginationOptions,
    nama_produk: string,
  ): Promise<Pagination<Produk>> {
    return paginate<Produk>(
    this.produkRepository
    .createQueryBuilder('pro')
    .where({nama_produk: nama_produk}),
    options,
    );
  }
}