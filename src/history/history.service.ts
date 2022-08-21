import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
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
      relations: ['cart.order', 'cart.detail.produk'],
      where: {
        id_user: id_user,
      },
      withDeleted: true,
    });
    console.log(user);
    
    return user;
  }
}
