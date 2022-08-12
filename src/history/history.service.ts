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
                    order:true,
                    detail:{
                        produk:true
                    }
                },
                alamat: true,   
            }, where: {
                id_user: id_user,
                cart: {
                    order: {
                        status :'telah dikirim'
                    }
                }
            }
        })
        const produk = user[0].cart.detail
        const alamat = user[0].alamat
        const order = user[0].cart.order
        return {
            produk: produk,
            order: order,
            alamat: alamat
        }
        
    }

}
