import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class managementOngkir {
    @PrimaryColumn()
    id_harga_kirim  : number;

    @Column()
    jarak: number;

    @Column()
    harga_kirim: number;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}