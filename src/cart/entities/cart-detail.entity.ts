import { IsNotEmpty } from "class-validator";
import { Produk } from "src/produk/entities/produk.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class cartDetail {
    @PrimaryGeneratedColumn('uuid')
    id_cart_detail: string

    @ManyToOne(() => Cart, (cart) => cart.detail, {
        onDelete: 'CASCADE'
    })
    @JoinTable()
    cart: Cart

    @ManyToOne(() => Produk, (produk)=> produk.detail, {onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    produk:Produk

    @IsNotEmpty()
    @Column()
    kuantiti: number

    @Column()
    harga_total: number

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}