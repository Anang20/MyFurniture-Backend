import { IsNotEmpty } from "class-validator";
import { cartDetail } from "src/cart/entities/cart-detail.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "../../order/entities/order.entity";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id_payment: string;

    @OneToOne(()=> Order, (order) => order.payment)
    @JoinColumn()
    order: Order

    @Column()
    nama_bank: string

    @IsNotEmpty()
    @Column()
    no_rek: number


    @IsNotEmpty()
    @Column()
    gambar_bukti: string;

    @Column()
    status: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @OneToOne(() => cartDetail, (detail)=> detail.produk)
    detail: cartDetail
}