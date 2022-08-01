import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsHalfWidth } from 'class-validator';
import { Produk } from 'src/produk/entities/produk.entity';
import { ProdukService } from 'src/produk/produk.service';
import { DataSource, EntityNotFoundError, Repository } from 'typeorm';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { cartDetail } from './entities/cart-detail.entity';

@Injectable()
export class CartService {
    constructor(
    @InjectRepository(cartDetail)
    private cartDetailRepository : Repository<cartDetail>,
    private produkService : ProdukService,
    ){}

    async create(id_produk:string ,createCartDetailDto: CreateCartDetailDto) {
        const produk = await this.produkService.findOne(id_produk)
        const hasil = new cartDetail()
        hasil.kuantiti = createCartDetailDto.kuantiti
        hasil.harga_total = createCartDetailDto.kuantiti * produk.harga
        hasil.produk = produk
        const result = await this.cartDetailRepository.insert(hasil)
        return this.cartDetailRepository.findOneOrFail({
          where: {
            id_cart_detail: result.identifiers[0].id_cart_detail,
          }
        });
      }

      async remove(id_cart_detail:string){
        try {
          await this.cartDetailRepository.findOneOrFail({
            where: {
              id_cart_detail,
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
    
        await this.cartDetailRepository.delete(id_cart_detail);
    }

    async update(id_cart_detail: string, updateCartDetailDto: UpdateCartDetailDto) {
      try {
        const hasil = await this.cartDetailRepository.findOneOrFail({
          where: {
            id_cart_detail : id_cart_detail
          }
        })
        
        hasil.harga_total = hasil.harga_total / hasil.kuantiti * updateCartDetailDto.kuantiti
        hasil.kuantiti = updateCartDetailDto.kuantiti
        await this.cartDetailRepository.save(hasil);

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
      return this.cartDetailRepository.findOneOrFail({
        where: {
          id_cart_detail,
        },
      });
    }
}