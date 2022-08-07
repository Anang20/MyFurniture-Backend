import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hasSubscribers } from 'diagnostics_channel';
import { Payment } from 'src/payment/entities/payment.entity';
import { Produk } from 'src/produk/entities/produk.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Produk)
        private produkRepository: Repository<Produk>,
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>
    ){}

    async findDashboard(){
        const user = await this.userRepository.findAndCount().then((data)=>{
            const [user, number] = data
            return number
        })
        const produk = await this.produkRepository.findAndCount().then((data)=>{
            const [user, number] = data
            return number
        })
        const payment = await this.paymentRepository.findAndCount().then((data)=>{
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

}
