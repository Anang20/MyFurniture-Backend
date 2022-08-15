import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hasSubscribers } from 'diagnostics_channel';
import { Payment } from 'src/payment/entities/payment.entity';
import { Produk } from 'src/produk/entities/produk.entity';
import { Role } from 'src/users/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        @InjectRepository(Produk)
        private produkRepository: Repository<Produk>,
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findDashboard(){
        const user = await this.userRepository.findAndCountBy({}).then((data)=>{
            const [user, number] = data
            return number - 1
        })
        
        const produk = await this.produkRepository.findAndCount().then((data)=>{
            const [user, number] = data
            return number
        })
        const payment = await this.paymentRepository.findAndCount({
            where : {
                status : 'selesai'
            }
        }).then((data)=>{
            const [user, number] = data
            return number
        })
        const hasil = {
            user: user,
            produk: produk,
            payment: payment
        }
        return hasil
    }

    async findCustomer(){
        const role = await this.roleRepository.find({
            relations: {
                user: true
            }, where:{
                role_name: 'customer'
            }
        })
        const user = role[0].user
        console.log(user);
        return user
    }

}
