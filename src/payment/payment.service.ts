import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cartDetail } from 'src/cart/entities/cart-detail.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import { Produk } from 'src/produk/entities/produk.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(cartDetail)
    private cartDetailRepository: Repository<cartDetail>,
    @InjectRepository(Produk)
    private produkRepository: Repository<Produk>
  ) {}
  
    async createPayment(createPaymentDto: CreatePaymentDto) {
      const order = await this.orderRepository.findOneOrFail({
        where: {
          id_order: createPaymentDto.id_order
        }
      })
      const hasil = new Payment()
      hasil.nama_bank = createPaymentDto.nama_bank
      hasil.no_rek = createPaymentDto.no_rek
      hasil.gambar_bukti = createPaymentDto.gambar
      hasil.order = order
      hasil.status = 'menunggu'
      await this.paymentRepository.insert(hasil)
      const year = order.created_at.getFullYear()
      const month = order.created_at.getMonth()
      const day = order.created_at.getDay()
      const getId = (num) => {
        return num.toString().padStart(6, "0")
      };
      const id = `${year}${month}${day}${getId(createPaymentDto.id_order)}`
      order.nomerOrder = id
      await this.orderRepository.save(order)
      return await this.paymentRepository.findOneOrFail({
        where: {
          id_payment: hasil.id_payment
        }
      })
    }

    async findAll(){
      const payment = await this.paymentRepository.find({
        where:{
          status: 'menunggu'
        }, relations:['order.cart.user']
      })
      // console.log(payment[0].order.cart.user);
      const data = []
      payment.map((value, i) => {
        let no = i +1
        data.push({
          No: no,
          NoOrder:value.order.nomerOrder,
          NamaCustomer: value.order.alamat.user.nama_lengkap,
          NamaBank: value.nama_bank,
          NoRek: value.no_rek,
          Bukti: value.gambar_bukti,
          Status: value.status, 
          id : value.id_payment
      }) 
    })
    console.log(data);
    
    return data
}

    async remove(id_payment: string){
      const payment = await this.paymentRepository.findOneOrFail({
        where: {
          id_payment: id_payment
        }
      })
      await this.paymentRepository.delete(id_payment)
    }

    async acc(id_payment: string){
      const payment = await this.paymentRepository.findOneOrFail({
        where: {
          id_payment: id_payment
        },relations: ['order.cart.detail.produk']
      })
      const order = payment.order
      order.status = 'sudah bayar'
      payment.status = 'diterima'
      await this.orderRepository.save(order)
      await this.paymentRepository.save(payment)
      return await this.paymentRepository.findOneOrFail({
        where:{
          id_payment: id_payment
        }
      })
    }

    async findAllAcc(){
      return await this.paymentRepository.findAndCount({
        where: {
          status: 'diterima'
        }
      })
    }

}
