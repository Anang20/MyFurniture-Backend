import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "../../order/entities/order.entity";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id_payment: string;

    @OneToOne(()=> Order, (order) => order.payment, {onDelete:'CASCADE'})
    @JoinColumn()
    order: Order

    @Column()
    nama_bank: string

    @Column()
    no_rek: string

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
}