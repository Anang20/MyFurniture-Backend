import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdukService } from 'src/produk/produk.service';
import { User } from 'src/users/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart-detail.dto';
import { UpdateCartDto } from './dto/update-cart-detail.dto';
import { Cart } from './entities/cart-detail.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private produkService: ProdukService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createCart(
    id_produk: string,
    id_user: string,
    createCartDto: CreateCartDto,
  ) {
    const user = await this.userRepository.findOneOrFail({
      where: { id_user },
    });
    const produk = await this.produkService.findOne(id_produk);
    const hasil = new Cart();
    hasil.kuantiti = createCartDto.kuantiti;
    hasil.harga_total = createCartDto.kuantiti * produk.harga;
    hasil.produk = produk;
    hasil.user = user;
    hasil.status = 'belum diorder'
    const result = await this.cartRepository.save(hasil);
    return this.cartRepository.findOneOrFail({
      where: {
        id_cart: result.id_cart,
      },
    });
  }

  async findCart(id_user: string) {
    const cart = await this.cartRepository.find({
      where: {
        user: {
          id_user,
        },
        status: 'belum diorder'
      },
    });
    return cart;
  }

  async update(id_cart: string, updateCartDto: UpdateCartDto) {
    try {
      const hasil = await this.cartRepository.findOneOrFail({
        where: {
          id_cart,
        },
      });
      hasil.harga_total =
        (hasil.harga_total / hasil.kuantiti) * updateCartDto.kuantiti;
      hasil.kuantiti = updateCartDto.kuantiti;
      await this.cartRepository.save(hasil);
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
    return this.cartRepository.findOneOrFail({
      where: {
        id_cart,
      },
    });
  }
  
  async remove(id_cart: string) {
    try {
      await this.cartRepository.findOneOrFail({
        where: {
          id_cart,
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
    await this.cartRepository.delete(id_cart);
  }
}
