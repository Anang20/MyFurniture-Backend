import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { resourceLimits } from 'worker_threads';
import { CreateOngkirDto } from './dto/createOngkir.dto';
import { managementOngkir } from './entities/management-ongkir.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(managementOngkir)
        private ongkirRepository : Repository<managementOngkir>,
        @InjectRepository(Order)
        private orderRepository : Repository<Order>
    ){}

    async createOngkir(createOngkirDto : CreateOngkirDto){
        const hasil = await this.ongkirRepository.insert(createOngkirDto)
        return this.ongkirRepository.findOneOrFail({
            where: {
                id_harga_kirim : hasil.identifiers[0].id_harga_kirim
            }
        })
    }
    
    
}
