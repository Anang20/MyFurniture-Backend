import { Order } from "src/order/entities/order.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { cartDetail } from "./cart-detail.entity";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id_cart : string

    @OneToMany(() => cartDetail, (cart) => cart.cart)
    detail: cartDetail

    @OneToOne(() => User, (user) => user.cart, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User
    
    @Column({
        default: 0
    })
    qty: number
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(()=> Order, (order)=> order.cart)
    order: Order
}