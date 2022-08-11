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
        private userRepository: Repository<User>
    ){}
    async findAll(){
        return this.orderRepository.findAndCount({
            where: {
                status : 'telah dikirim'
            }
        })
    }

    async findOne(id_user: string){
        const user =  await this.userRepository.find({
            relations: {
                cart: {
                    order:true
                }
            }, where: {
                id_user: id_user,
                cart: {
                    order: {
                        status :'telah dikirim'
                    }
                }
            }
        })
        return user[0].cart.order
    }

}
