import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alamat } from 'src/users/entities/alamat.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateOngkirDto } from './dto/updateOngkir.dto';
import { CreateOrderDto } from './dto/createOrder.dto';
import { managementOngkir } from './entities/management-ongkir.entity';
import { Order } from './entities/order.entity';
import { Produk } from 'src/produk/entities/produk.entity';
import { Role } from 'src/users/entities/role.entity';
import { generateExcel } from 'src/helper/export_excel';
import { async } from 'rxjs';
import { Cart } from 'src/cart/entities/cart-detail.entity';
// import { generateExcel } from 'src/helper/export_excel';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(managementOngkir)
    private ongkirRepository: Repository<managementOngkir>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Alamat)
    private alamatRepository: Repository<Alamat>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Untuk Admin
  async updateOngkir(updateOngkirDto: UpdateOngkirDto) {
    const hasil = await this.ongkirRepository.findOneOrFail({
      where: {
        id_harga_kirim: 1,
      },
    });
    hasil.harga_kirim = updateOngkirDto.harga_kirim;
    hasil.jarak = updateOngkirDto.jarak;
    await this.ongkirRepository.save(hasil);
    return await this.ongkirRepository.findOneOrFail({
      where: {
        id_harga_kirim: hasil.id_harga_kirim,
      },
    });
  }

  // Untuk Users

  async totalHargaProduk(id_user: string) {
    const user = await this.userRepository.find({
      relations: { cart: true },
      where: { id_user, cart: { status: 'belum diorder' } },
    });
    const harga: number[] = [];
    user[0].cart.map((value) => harga.push(value.harga_total));
    const totalHarga = harga.reduce((a, b) => {
      return a + b;
    });
    return totalHarga;
  }

  async createOrder(createOrder: CreateOrderDto) {
    const alamat = await this.alamatRepository.findOneOrFail({
      where: {
        id_alamat_user: createOrder.id_alamat,
      },
    });

    const ongkir = await this.ongkirRepository.findOne({
      where: {
        id_harga_kirim: 1,
      },
    });
    const order = new Order();
    const id = [createOrder.id_cart];
    order.cart =[]
    order.alamat = alamat;
    order.total_hrg_brg = createOrder.total_hrg_brg;
    order.total_hrg_krm = createOrder.total_hrg_krm;
    order.total_order = createOrder.total_order;
    order.ongkir = ongkir;
    order.status = 'belum bayar';
    order.nomerOrder = '';
    await this.orderRepository.insert(order);
    await id[0].map(async (value) => {
      const cartId = await this.cartRepository.findOneOrFail({
        where: { id_cart: value },
      });
      const deta = await this.orderRepository.findOneOrFail({where:{id_order:order.id_order}})
      console.log(deta, 'ini deta');
      cartId.status = 'telah diorder';
      cartId.order = deta
      await this.cartRepository.save(cartId)
      console.log(cartId);
      
    });
    return await this.orderRepository.findOneOrFail({
      relations:{cart:true},
      where: {
        id_order: order.id_order,
      },
    });
  }

  async createOngkirTotal(id_alamat_user: string) {
    const alamat = await this.alamatRepository.findOneOrFail({
      where: {
        id_alamat_user,
      },
    });
    const user = await this.roleRepository.findOne({
      where: {
        role_name: 'admin',
      },
      relations: {
        user: {
          alamat: true,
        },
      },
    });
    const alamatAdmin = user.user[0].alamat[0];
    const latAdmin = alamatAdmin.latitude;
    const longAdmin = alamatAdmin.longtitude;
    const latUser = alamat.latitude;
    const longUser = alamat.longtitude;
    const ongkir = await this.ongkirRepository.findOne({
      where: {
        id_harga_kirim: 1,
      },
    });
    const harga_kirim = ongkir.harga_kirim / ongkir.jarak;
    function distance(lat1, lon1, lat2, lon2, unit) {
      if (lat1 == lat2 && lon1 == lon2) {
        return 0;
      } else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == 'K') {
          dist = dist * 1.609344;
        }
        if (unit == 'N') {
          dist = dist * 0.8684;
        }
        const hasil = Math.round(dist) * harga_kirim;

        return hasil;
      }
    }
    const hasil = distance(latAdmin, longAdmin, latUser, longUser, harga_kirim);
    return hasil;
  }

  async findOrderByUser(id_user: string) {
    const user = await this.userRepository.findOneOrFail({
      relations:['alamat.order.cart'],
      where: {id_user}
    })
    // console.log(order);
    const order = []
    user.alamat.map(value => {
      if(value.order.length > 0){
        value.order.map(val => order.push(val))
      }
    })
    
    return order;
  }

  async findAll() {
    const order = await this.orderRepository.find({
      relations: [
        'cart.produk',
        'alamat.kelurahan.kecamatan.kota.provinsi',
        'cart.user',
      ],
      withDeleted: true,
    });
    const curency = (value) => {
      const formatter = new Intl.NumberFormat('en-ID', {
        style: 'currency',
        currency: 'IDR',
      })
        .format(value)
        .replace(/[IDR]/gi, '')
        .replace(/(\.+\d{2})/, '')
        .trimLeft();
      return formatter;
    };
    const data = [];
    order.map((value) => {
      const data2 = [];
      data2[0] = value.cart;
      if (data2[0].length >= 1) {
        data2[0].map((value2, i) => {
          return data.push({
            NomerOrder: value.nomerOrder,
            Tanggal: value.created_at.toDateString(),
            Nama: value.cart[i].user.nama_lengkap,
            Produk: value2.produk.nama_produk,
            Kuantiti: value2.kuantiti,
            HargaBarang: `Rp. ${curency(value2.produk.harga)} `,
            Alamat: `${value.alamat.alamat}, ${value.alamat.kelurahan.nama_kelurahan}, ${value.alamat.kelurahan.kecamatan.nama_kecamatan}, ${value.alamat.kelurahan.kecamatan.kota.nama_kota}, ${value.alamat.kelurahan.kecamatan.kota.provinsi.nama_provinsi}`,
            status: value.status,
            id: value.id_order,
            noTelp: value.cart[i].user.no_telp,
          });
        });
      }
    });
    data.forEach((el,i)=> 
      el.No = i + 1
    )
    return data;
  }

  async terima(id_order: number) {
    const order = await this.orderRepository.findOneOrFail({
      where: {
        id_order: id_order,
      },
    });
    order.status = 'telah dikirim';
    await this.orderRepository.save(order);
    return this.orderRepository.findOneOrFail({
      where: {
        id_order: order.id_order,
      },
    });
  }
  async exportExcel() {
    try {
      const order = await this.orderRepository.find({
        relations: ['cart.produk', 'cart.user'],
        where: {
          status: 'telah dikirim',
        },
      });

      const data = [];
      order.map(async (value, i) => {
        let no = i + 1;
        let Tanggal = value.created_at.toDateString();
        await data.push({
          No: no,
          Tanggal: Tanggal,
          NoOrder: value.nomerOrder,
          Nama: value.cart[0].user.nama_lengkap,
          totalOrder: value.total_order,
          status: value.status,
        });
      });
      const excel = await generateExcel(data, 'Hit-Log-Api');
      return excel;
    } catch (e) {
      return e;
    }
  }

  async cariLaporan() {
    try {
      const order = await this.orderRepository.find({
        relations: ['cart.produk', 'cart.user'],
        where: {
          status: 'telah dikirim',
        },
      });

      const data = [];
      order.map(async (value, i) => {
        let no = i + 1;
        let Tanggal = value.created_at.toDateString();
        await data.push({
          No: no,
          Tanggal: Tanggal,
          NoOrder: value.nomerOrder,
          Nama: value.cart[0].user.nama_lengkap,
          totalOrder: value.total_order,
          status: value.status,
        });
      });
      console.log(data, 'ini data');

      return data;
    } catch (e) {
      return e;
    }
  }
}
