import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findAll() {
    return this.orderRepository.find({
      where: {
        status: 'telah dikirim',
      },
    });
  }

  async findOne(id_user: string) {
    const user = await this.userRepository.findOneOrFail({
      relations: [
        'alamat.kelurahan.kecamatan.kota.provinsi',
        'alamat.order.cart.produk',
      ],
      where: {
        id_user: id_user,
      },
    });
    console.log(user);
    
    const data = [];
    user.alamat.map(async (value) => {
      console.log(value,'ini value');
      console.log(value.kelurahan);
      
      if (value.order.length > 0) {
        value.order.map((order) =>
          data.push({
            nomerorder: order.nomerOrder,
            totalOrder: order.total_order,
            produk: order.cart,
            status: order.status,
            alamat: `${value.alamat}, ${value.kelurahan.nama_kelurahan}, ${value.kelurahan.kecamatan.nama_kecamatan}, ${value.kelurahan.kecamatan.kota.nama_kota}, ${value.kelurahan.kecamatan.kota.provinsi.nama_provinsi}`,
          }),
        );
      }
    });
    return data;
  }
}
