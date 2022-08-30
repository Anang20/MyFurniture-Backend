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
    private userRepository: Repository<User>,
  ) {}

  async findDashboard() {
    const user = await this.userRepository.findAndCountBy({}).then((data) => {
      const [user, number] = data;
      return number - 1;
    });

    const produk = await this.produkRepository.findAndCount().then((data) => {
      const [user, number] = data;
      return number;
    });
    const payment = await this.paymentRepository
      .findAndCount({
        where: {
          status: 'diterima',
        },
      })
      .then((data) => {
        const [user, number] = data;
        return number;
      });
    const hasil = {
      user: user,
      produk: produk,
      payment: payment,
    };
    return hasil;
  }

  async findCustomer() {
    const role = await this.roleRepository.find({
      relations: {
        user: true,
      },
      where: {
        role_name: 'customer',
      },
    });
    const user = role[0].user;
    console.log(user);
    return user;
  }

  async getDataTransaksi() {
    const payment = await this.paymentRepository.find({
      where: {
        status: 'diterima',
      },
    });
    const Januari = [];
    const Februari = [];
    const Maret = [];
    const April = [];
    const Mei = [];
    const Juni = [];
    const Juli = [];
    const Agustus = [];
    const September = [];
    const Oktober = [];
    const November = [];
    const Desember = [];
    const JanuariOld = [];
    const FebruariOld = [];
    const MaretOld = [];
    const AprilOld = [];
    const MeiOld = [];
    const JuniOld = [];
    const JuliOld = [];
    const AgustusOld = [];
    const SeptemberOld = [];
    const OktoberOld = [];
    const NovemberOld = [];
    const DesemberOld = [];
    payment.map((value) => {
      const month = value.updated_at.getMonth() + 1;
      const yearNow = new Date();
      const year = value.updated_at.getFullYear();
      if (month == 1 && year == yearNow.getFullYear()) {
        Januari.push(value);
      } else if (month == 2 && year == yearNow.getFullYear()) {
        Februari.push(value);
      } else if (month == 3 && year == yearNow.getFullYear()) {
        Maret.push(value);
      } else if (month == 4 && year == yearNow.getFullYear()) {
        April.push(value);
      } else if (month == 5 && year == yearNow.getFullYear()) {
        Mei.push(value);
      } else if (month == 6 && year == yearNow.getFullYear()) {
        Juni.push(value);
      } else if (month == 7 && year == yearNow.getFullYear()) {
        Juli.push(value);
      } else if (month == 8 && year == yearNow.getFullYear()) {
        Agustus.push(value);
      } else if (month == 9 && year == yearNow.getFullYear()) {
        September.push(value);
      } else if (month == 10 && year == yearNow.getFullYear()) {
        Oktober.push(value);
      } else if (month == 11 && year == yearNow.getFullYear()) {
        November.push(value);
      } else if (month == 12 && year == yearNow.getFullYear()) {
        Desember.push(value);
      } else if (month == 1 && year == yearNow.getFullYear() - 1) {
        JanuariOld.push(value);
      } else if (month == 2 && year == yearNow.getFullYear() - 1) {
        FebruariOld.push(value);
      } else if (month == 3 && year == yearNow.getFullYear() - 1) {
        MaretOld.push(value);
      } else if (month == 4 && year == yearNow.getFullYear() - 1) {
        AprilOld.push(value);
      } else if (month == 5 && year == yearNow.getFullYear() - 1) {
        MeiOld.push(value);
      } else if (month == 6 && year == yearNow.getFullYear() - 1) {
        JuniOld.push(value);
      } else if (month == 7 && year == yearNow.getFullYear() - 1) {
        JuliOld.push(value);
      } else if (month == 8 && year == yearNow.getFullYear() - 1) {
        AgustusOld.push(value);
      } else if (month == 9 && year == yearNow.getFullYear() - 1) {
        SeptemberOld.push(value);
      } else if (month == 10 && year == yearNow.getFullYear() - 1) {
        OktoberOld.push(value);
      } else if (month == 11 && year == yearNow.getFullYear() - 1) {
        NovemberOld.push(value);
      } else if (month == 12 && year == yearNow.getFullYear() - 1) {
        DesemberOld.push(value);
      }
    });
    return {
      Now: {
        Januari: Januari.length || 0,
        Februari: Februari.length || 0,
        Maret: Maret.length || 0,
        April: April.length || 0,
        Mei: Mei.length || 0,
        Juni: Juni.length || 0,
        Juli: Juli.length || 0,
        Agustus: Agustus.length || 0,
        September: September.length || 0,
        Oktober: Oktober.length || 0,
        November: November.length || 0,
        Desember: Desember.length || 0,
      },
      Old: {
        JanuariOld: Januari.length || 0,
        FebruariOld: Februari.length || 0,
        MaretOld: Maret.length || 0,
        AprilOld: April.length || 0,
        MeiOld: Mei.length || 0,
        JuniOld: Juni.length || 0,
        JuliOld: Juli.length || 0,
        AgustusOld: Agustus.length || 0,
        SeptemberOld: September.length || 0,
        OktoberOld: Oktober.length || 0,
        NovemberOld: November.length || 0,
        DesemberOld: Desember.length || 0,
      },
    };
  }
  async getDataRegistrasi() {
    const User = await this.userRepository.find();
    const Januari = [];
    const Februari = [];
    const Maret = [];
    const April = [];
    const Mei = [];
    const Juni = [];
    const Juli = [];
    const Agustus = [];
    const September = [];
    const Oktober = [];
    const November = [];
    const Desember = [];
    const JanuariOld = [];
    const FebruariOld = [];
    const MaretOld = [];
    const AprilOld = [];
    const MeiOld = [];
    const JuniOld = [];
    const JuliOld = [];
    const AgustusOld = [];
    const SeptemberOld = [];
    const OktoberOld = [];
    const NovemberOld = [];
    const DesemberOld = [];
    User.map((value) => {
      const month = value.created_at.getMonth() + 1;
      const yearNow = new Date();
      const year = value.updated_at.getFullYear();
      if (month == 1 && year == yearNow.getFullYear()) {
        Januari.push(value);
      } else if (month == 2 && year == yearNow.getFullYear()) {
        Februari.push(value);
      } else if (month == 3 && year == yearNow.getFullYear()) {
        Maret.push(value);
      } else if (month == 4 && year == yearNow.getFullYear()) {
        April.push(value);
      } else if (month == 5 && year == yearNow.getFullYear()) {
        Mei.push(value);
      } else if (month == 6 && year == yearNow.getFullYear()) {
        Juni.push(value);
      } else if (month == 7 && year == yearNow.getFullYear()) {
        Juli.push(value);
      } else if (month == 8 && year == yearNow.getFullYear()) {
        Agustus.push(value);
      } else if (month == 9 && year == yearNow.getFullYear()) {
        September.push(value);
      } else if (month == 10 && year == yearNow.getFullYear()) {
        Oktober.push(value);
      } else if (month == 11 && year == yearNow.getFullYear()) {
        November.push(value);
      } else if (month == 12 && year == yearNow.getFullYear()) {
        Desember.push(value);
      } else if (month == 1 && year == yearNow.getFullYear() - 1) {
        JanuariOld.push(value);
      } else if (month == 2 && year == yearNow.getFullYear() - 1) {
        FebruariOld.push(value);
      } else if (month == 3 && year == yearNow.getFullYear() - 1) {
        MaretOld.push(value);
      } else if (month == 4 && year == yearNow.getFullYear() - 1) {
        AprilOld.push(value);
      } else if (month == 5 && year == yearNow.getFullYear() - 1) {
        MeiOld.push(value);
      } else if (month == 6 && year == yearNow.getFullYear() - 1) {
        JuniOld.push(value);
      } else if (month == 7 && year == yearNow.getFullYear() - 1) {
        JuliOld.push(value);
      } else if (month == 8 && year == yearNow.getFullYear() - 1) {
        AgustusOld.push(value);
      } else if (month == 9 && year == yearNow.getFullYear() - 1) {
        SeptemberOld.push(value);
      } else if (month == 10 && year == yearNow.getFullYear() - 1) {
        OktoberOld.push(value);
      } else if (month == 11 && year == yearNow.getFullYear() - 1) {
        NovemberOld.push(value);
      } else if (month == 12 && year == yearNow.getFullYear() - 1) {
        DesemberOld.push(value);
      }
    });
    return {
      Now: {
        Januari: Januari.length || 0,
        Februari: Februari.length || 0,
        Maret: Maret.length || 0,
        April: April.length || 0,
        Mei: Mei.length || 0,
        Juni: Juni.length || 0,
        Juli: Juli.length || 0,
        Agustus: Agustus.length || 0,
        September: September.length || 0,
        Oktober: Oktober.length || 0,
        November: November.length || 0,
        Desember: Desember.length || 0,
      },
      Old: {
        JanuariOld: Januari.length || 0,
        FebruariOld: Februari.length || 0,
        MaretOld: Maret.length || 0,
        AprilOld: April.length || 0,
        MeiOld: Mei.length || 0,
        JuniOld: Juni.length || 0,
        JuliOld: Juli.length || 0,
        AgustusOld: Agustus.length || 0,
        SeptemberOld: September.length || 0,
        OktoberOld: Oktober.length || 0,
        NovemberOld: November.length || 0,
        DesemberOld: Desember.length || 0,
      },
    };
  }
}
