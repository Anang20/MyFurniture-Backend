import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async, map } from 'rxjs';
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
      relations: ['cart.order.alamat.kelurahan.kecamatan.kota.provinsi', 'cart.order.cart.detail.produk'],
      where: {
        id_user: id_user,
      },
      withDeleted: true,
    });
    console.log(user.cart.order);
    const order = user.cart.order
    const data = []
    
    order.map((value)=>{
        data.push({
          nomerorder:value.nomerOrder,
          totalOrder: value.total_order,
          produk: value.cart.detail,
          status: value.status,
          alamat: `${value.alamat.alamat}, ${value.alamat.kelurahan.nama_kelurahan}, ${value.alamat.kelurahan.kecamatan.nama_kecamatan}, ${value.alamat.kelurahan.kecamatan.kota.nama_kota}, ${value.alamat.kelurahan.kecamatan.kota.provinsi.nama_provinsi}`,
      })
    }) 
    console.log(data, 'ini data');
    
    return data;
  }
}
