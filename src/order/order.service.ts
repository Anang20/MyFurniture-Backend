import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cartDetail } from 'src/cart/entities/cart-detail.entity';
import { Cart } from 'src/cart/entities/cart.entity';
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

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        @InjectRepository(managementOngkir)
        private ongkirRepository : Repository<managementOngkir>,
        @InjectRepository(Order)
        private orderRepository : Repository<Order>,
        @InjectRepository(Alamat)
        private alamatRepository : Repository<Alamat>,
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    // Untuk Admin
    async updateOngkir( updateOngkirDto : UpdateOngkirDto){
        const hasil = await this.ongkirRepository.findOneOrFail({
            where: {
                id_harga_kirim : 1,
            }
        })
        hasil.harga_kirim = updateOngkirDto.harga_kirim
        hasil.jarak = updateOngkirDto.jarak
        await this.ongkirRepository.save(hasil)
        return await this.ongkirRepository.findOneOrFail({
            where: {
                id_harga_kirim : hasil.id_harga_kirim
            }
        })
    }
    
    // Untuk Users

    async totalHargaProduk(id_cart: string){
        const Cart = await this.cartRepository.find({
            relations:{
                detail: true
            },
            where : {
                id_cart : id_cart,
                detail:{
                    status: 'dipilih'
                }
            }, 
        })
        const detail= []
        detail[0]= Cart[0].detail
        const harga: number[] = []
        detail[0].map(async (i) => {    
           await harga.push(i.harga_total)
        })     
        const totalHarga = harga.reduce((a, b) => {
            return a + b
        })
        return totalHarga
    }

    async createOrder(createOrder : CreateOrderDto){
        const alamat = await this.alamatRepository.find({
            where: {
                id_alamat_user : createOrder.id_alamat
            }
        })
        const ongkir = await this.ongkirRepository.findOne({
            where: {
                id_harga_kirim: 1
            }
        })
        const cart = await this.cartRepository.findOneOrFail({
            where: {
                id_cart: createOrder.id_cart
            }
        })
        const order = new Order()
        order.alamat = alamat
        order.cart = cart
        order.total_hrg_brg = createOrder.total_hrg_brg
        order.total_hrg_krm = createOrder.total_hrg_krm
        order.total_order = createOrder.total_order
        order.ongkir = ongkir
        order.status = 'belum bayar'
        await this.orderRepository.insert(order)  
        return await this.orderRepository.findOneOrFail({
            where: {
                id_order : order.id_order
            }
        })  
    }

    async createOngkirTotal(id_alamat_user: string){
        const alamat = await this.alamatRepository.findOneOrFail({
            where:{
                id_alamat_user
            }
        })
        const user = await this.roleRepository.findOne({
            where: {
                role_name: 'admin'
            }, relations: {
                user: {
                    alamat: true
                }
            }
        })     
        const alamatAdmin = user.user[0].alamat[0]
        const latAdmin = alamatAdmin.latitude    
        const longAdmin = alamatAdmin.longtitude
        const latUser = alamat.latitude
        const longUser = alamat.longtitude     
        const ongkir = await this.ongkirRepository.findOne({
            where: {
                id_harga_kirim : 1
            }
        })
        const harga_kirim = ongkir.harga_kirim / ongkir.jarak
        function distance(lat1, lon1, lat2, lon2, unit) {
            if ((lat1 == lat2) && (lon1 == lon2)) {
                return 0;
            }
            else {
                var radlat1 = Math.PI * lat1/180;
                var radlat2 = Math.PI * lat2/180;
                var theta = lon1-lon2;
                var radtheta = Math.PI * theta/180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180/Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit=="K") { dist = dist * 1.609344 }
                if (unit=="N") { dist = dist * 0.8684 }
                const hasil = Math.round(dist) * harga_kirim
            
                return hasil;
            }
        }
       const hasil =  distance(latAdmin, longAdmin, latUser, longUser, harga_kirim)
       return hasil
    }

    async findOne(id_user : string){
        const user = await this.userRepository.findOneOrFail({
            where:{
                id_user : id_user
            }, relations: {
                cart: {
                    order: true
                }
            }
        })
        const order = user.cart.order
        return order
    }

    async findAll(){
        return await this.orderRepository.findAndCount()
    }

    async terima(id_order: string){
        const order = await this.orderRepository.findOneOrFail({
            where: {
                id_order: id_order
            }
        })
        order.status = 'telah dikirim'
        await this.orderRepository.save(order)
        return this.orderRepository.findOneOrFail({
            where: {
                id_order: order.id_order
            }
        })
    }
    async exportExcel(){
        const order = await this.orderRepository.find({
        relations:{
                cart: {
                    detail:{
                        produk: true
                    },
                    user: true
                }
            }, where: {
                status: 'telah dikirim'
            }
        })
        const detail = []
        // console.log(order[0].cart.detail[0]);
        
        detail[0] = order[0].cart.detail
        const Tanggal = order[0].cart.created_at
        const Nama = order[0].cart.user.nama_lengkap
        const harga_kirim = order[0].total_hrg_krm
        const harga_total = order[0].total_order
        const data = []
        detail[0].map(async (i) =>{
            console.log(i, 'ini i');
            
            await data.push([
                Tanggal,
                Nama,
                i.produk.nama_produk,
                i.kuantiti,
                i.produk.harga,
                harga_kirim,
                harga_total,
            ])
        })
        console.log(data, 'Ini data');
        
        const excel = await generateExcel(data, 'Hit-Log-Api')
        console.log(excel, 'ini excel');
        return excel
    }
}
