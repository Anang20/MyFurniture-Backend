import { Order } from "src/payment/entities/order.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { cartDetail } from "./cart-detail.entity";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id_cart : string

    @OneToMany(() => cartDetail, (cart) => cart.cart)
    detail: cartDetail

    @OneToOne(() => User, (user) => user.cart)
    @JoinColumn()
    user: User
    
    @Column()
    qty: number

    @Column()
    status: string
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToOne(()=> Order, (order)=> order.cart)
    order: Order
}