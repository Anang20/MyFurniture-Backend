import { Column } from "typeorm";

export class CreateOrderDto{
    @Column()
    id_cart: string

    @Column()
    id_alamat: string
    
    @Column()
    id_harga_kirim: string

    @Column()
    total_hrg_brg: number;

    @Column()
    total_hrg_krm: number;

    @Column()
    total_order: number;
}