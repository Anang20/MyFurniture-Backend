import { IsNotEmpty } from "class-validator";
import { Produk } from "src/produk/entities/produk.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class cartDetail {
    @PrimaryGeneratedColumn('uuid')
    id_cart_detail: string

    @ManyToOne(() => Cart, (cart) => cart.detail, {
        onDelete: 'SET NULL'
    })
    @JoinTable()
    cart: Cart

    @OneToOne(() => Produk, (produk)=> produk.detail)
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