import { cartDetail } from "src/cart/entities/cart-detail.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Produk {
    @PrimaryGeneratedColumn('uuid')
    id_produk: string;

    @Column()
    gambar: string;

    @Column()
    nama_produk: string;

    @Column()
    harga: number;

    @Column("text")
    deskripsi: string;

    @Column()
    stok: number;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @OneToMany(() => cartDetail, (detail)=> detail.produk)
    detail: cartDetail
}