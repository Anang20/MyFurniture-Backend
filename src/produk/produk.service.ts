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

  async create(createProdukDto: CreateProdukDto) {
      const result = await this.produkRepository.insert({
        ...createProdukDto,
      });
      return this.produkRepository.findOneOrFail({
        where: {
          id_produk: result.identifiers[0].id_produk,
        },
      });
  }

  async findProduk(
    options: IPaginationOptions,
    search: string,
  ): Promise<Pagination<Produk>> {
    const query = this.produkRepository.createQueryBuilder('produk');

    if (search) {
      query
        .where('produk.nama_produk ilike :search', { search: `%${search}%` })
    }
    await query.getMany();
    return paginate<Produk>(query, options);
  }

  async findAll() {
    const produk = await this.produkRepository.find()
    const proses = produk
    const data = []
    proses.map(async (value, i)=>{
      const formatter = new Intl.NumberFormat('en-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(value.harga)
      .replace(/[IDR]/gi, '')
      .replace(/(\.+\d{2})/, '')
      .trimLeft()
      let no = i + 1
      data.push({
        No: no,
        nama_produk: value.nama_produk,
        gambar: value.gambar,
        harga: `Rp. ${formatter}`,
        deskripsi: value.deskripsi,
        stok: value.stok,
        id: value.id_produk
      })
    })
    return data
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

  
  async update( id_produk: string, updateProdukDto: UpdateProdukDto) {
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
            error: 'Data not found'
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
    const produk = await this.produkRepository.findOneOrFail({
      where:{
        id_produk
      }
    })

    produk.gambar = updateProdukDto.gambar
    produk.deskripsi = updateProdukDto.deskripsi
    produk.harga = updateProdukDto.harga
    produk.stok= updateProdukDto.stok
    produk.nama_produk = updateProdukDto.nama_produk
    await this.produkRepository.save(produk)
    return this.produkRepository.findOneOrFail({
      where: {
        id_produk
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