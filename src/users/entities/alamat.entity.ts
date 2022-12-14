import { Order } from "src/order/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Kelurahan } from "./kelurahan.entity";
import { User } from "./user.entity";

@Entity()
export class Alamat {
    @PrimaryGeneratedColumn('uuid')
    id_alamat_user: string;

    @ManyToOne(
        () => {
            return Kelurahan;
        },
        (callBack) => {
            return callBack.id_kelurahan
        }
    )
    kelurahan: Kelurahan;

    @Column()
    alamat: string;

    @Column()
    latitude: string;

    @Column()
    longtitude: string

    @ManyToOne(() =>  User, user => user.alamat, {onDelete:'CASCADE'})
    @JoinTable()
    user: User

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(()=> Order, order => order.alamat, {onDelete: 'CASCADE'})
    order: Order[]

}