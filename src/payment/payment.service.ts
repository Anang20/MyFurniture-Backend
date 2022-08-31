import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Cart } from 'src/cart/entities/cart-detail.entity';
import { Order } from 'src/order/entities/order.entity';
import { Produk } from 'src/produk/entities/produk.entity';
import { User } from 'src/users/entities/user.entity';
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
    @InjectRepository(Produk)
    private produkRepository: Repository<Produk>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const order = await this.orderRepository.findOneOrFail({
      where: {
        id_order: createPaymentDto.id_order,
      },
    });
    const hasil = new Payment();
    hasil.nama_bank = createPaymentDto.nama_bank;
    hasil.no_rek = createPaymentDto.no_rek;
    hasil.gambar_bukti = createPaymentDto.gambar;
    hasil.order = order;
    hasil.status = 'menunggu';
    await this.paymentRepository.insert(hasil);
    const year = order.created_at.getFullYear();
    const month = order.created_at.getMonth();
    const day = order.created_at.getDay();
    const getId = (num) => {
      return num.toString().padStart(6, '0');
    };
    const id = `${year}${month}${day}${getId(createPaymentDto.id_order)}`;
    console.log(id, 'ini id');

    order.nomerOrder = id;
    order.status = 'sudah bayar';
    await this.orderRepository.save(order);
    return await this.paymentRepository.findOneOrFail({
      where: {
        id_payment: hasil.id_payment,
      },
    });
  }

  async findAll() {
    const payment = await this.paymentRepository.find({
      where: {
        status: 'menunggu',
      },
      relations: ['order.cart.user'],
    });
    console.log(payment[0].order.cart);
    const data = [];
    payment.map((value, i) => {
      let no = i + 1;
      data.push({
        No: no,
        NoOrder: value.order.nomerOrder,
        NamaCustomer: value.order.cart[0].user.nama_lengkap,
        NamaBank: value.nama_bank,
        NoRek: value.no_rek,
        Bukti: value.gambar_bukti,
        Status: value.status,
        id: value.id_payment,
      });
    });
    console.log(data);
    return data;
  }

  async remove(id_payment: string) {
    const payment = await this.paymentRepository.findOneOrFail({
      relations: ['order.cart'],
      where: {
        id_payment: id_payment,
      },
    });
    const cart = payment.order.cart;
    cart.map(async (val) => await this.cartRepository.delete(val.id_cart));
    await this.orderRepository.delete(payment.order.id_order);
  }

  async acc(id_payment: string) {
    const payment = await this.paymentRepository.findOneOrFail({
      where: {
        id_payment: id_payment,
      },
      relations: ['order.cart.produk'],
    });
    payment.order.cart.map(async (value) => {
      const produk = await this.produkRepository.findOneOrFail({
        where: { id_produk: value.produk.id_produk },
      });
      produk.stok -= value.kuantiti;
      await this.produkRepository.save(produk);
    });
    const order = payment.order;
    order.status = 'diterima';
    payment.status = 'diterima';
    await this.orderRepository.save(order);
    await this.paymentRepository.save(payment);
    return await this.paymentRepository.findOneOrFail({
      where: {
        id_payment: id_payment,
      },
    });
  }

  async findAllAcc() {
    return await this.paymentRepository.findAndCount({
      where: {
        status: 'diterima',
      },
    });
  }
}
