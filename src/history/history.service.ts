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
        'alamat.order.cart.detail.produk',
      ],
      where: {
        id_user: id_user,
      },
    });
    const data = [];
    user.alamat.map(async (value) => {
      if (value.order.length > 0) {
        value.order.map((order) =>
          data.push({
            nomerorder: order.nomerOrder,
            totalOrder: order.total_order,
            produk: order.cart,
            status: order.status,
            alamat: `${order.alamat.alamat}, ${order.alamat.kelurahan.nama_kelurahan}, ${order.alamat.kelurahan.kecamatan.nama_kecamatan}, ${order.alamat.kelurahan.kecamatan.kota.nama_kota}, ${order.alamat.kelurahan.kecamatan.kota.provinsi.nama_provinsi}`,
          }),
        );
      }
    });
    return data;
  }

  async findById(id_order) {
    const order = await this.orderRepository.findOneOrFail({
      relations: ['cart.produk'],
      where: { id_order },
    });
    const data = [];
    order.cart.map(
      async (value) =>
        await data.push({
          namaProduk: value.produk.nama_produk,
          hargaProduk: value.produk.harga,
          kuantiti: value.kuantiti,
          hargaTotal: value.harga_total,
        }),
    );
    console.log(data, 'ini data');
    return data;
  }
}
