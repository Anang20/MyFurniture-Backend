import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class managementOngkir {
    @PrimaryGeneratedColumn('uuid')
    id_harga_kirim  : string;

    @Column()
    jarak: string;

    @Column()
    harga_kirim: number;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @OneToOne(()=> Order, (order) => order.ongkir)
    order: Order
}