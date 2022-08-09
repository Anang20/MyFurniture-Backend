import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdukService } from 'src/produk/produk.service';
import { User } from 'src/users/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { cartDetail } from './entities/cart-detail.entity';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
    constructor(            
    @InjectRepository(cartDetail)
    private cartDetailRepository : Repository<cartDetail>,
    private produkService : ProdukService,
    @InjectRepository(Cart)
    private cartRepository : Repository<Cart>
    ){}

    async createCart(user: User){
      console.log(user);
      const hasil = new Cart()
      hasil.user = user
      const result = await this.cartRepository.insert(hasil)
      console.log(result);
      
    }

    async createCartDetail(id_produk:string, id_cart: string ,createCartDetailDto: CreateCartDetailDto) {
        const produk = await this.produkService.findOne(id_produk)
        const cart = await this.cartRepository.findOneOrFail({
          where : {
            id_cart
          }, 
        })
        const hasil = new cartDetail()
        hasil.kuantiti = createCartDetailDto.kuantiti
        hasil.harga_total = createCartDetailDto.kuantiti * produk.harga
        hasil.produk = produk
        hasil.cart = cart
        hasil.status = 'tidak-dipilih'
        const result = await this.cartDetailRepository.save(hasil)
        return this.cartDetailRepository.findOneOrFail({
          where: {
            id_cart_detail: result.id_cart_detail,
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

    async ceklist(id_cart_detail:string){
      const hasil = await this.cartDetailRepository.findOneOrFail({
        where: {
          id_cart_detail: id_cart_detail
        }
      })
      hasil.status= 'dipilih'
      await this.cartDetailRepository.save(hasil)
      return this.cartDetailRepository.findOneOrFail({
        where: {
          id_cart_detail: hasil.id_cart_detail
        }
      })
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

   async findAll(id_cart : string){
      try {
        const hasil = await this.cartRepository.findOneOrFail({
          where : {
            id_cart : id_cart
          },
          relations:{
            detail:true 
          }
        })
        return hasil.detail
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

    async findCart(){
      return await this.cartRepository.findAndCount({
        relations: {
          user: true
        }
      })
    }
}