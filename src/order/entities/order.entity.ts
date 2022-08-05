import { cartDetail } from "src/cart/entities/cart-detail.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { managementOngkir } from "./management-ongkir.entity";
import { Payment } from "../../payment/entities/payment.entity";
import { Alamat } from "src/users/entities/alamat.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id_order: string;

    @OneToOne(()=> Cart, (cart) => cart.order)
    @JoinColumn()
    cart: Cart
    
    @OneToOne(()=> managementOngkir, (ongkir) => ongkir.order)
    @JoinColumn()
    ongkir: managementOngkir

    @OneToOne(()=> Payment, (payment) => payment.order)
    payment: Payment

    @Column()
    total_hrg_brg: number;

    @Column()
    total_hrg_krm: number;

    @Column()
    total_order: number;

    @Column()
    status: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @OneToOne(() => cartDetail, (detail)=> detail.produk)
    detail: cartDetail
}