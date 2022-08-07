import { Column } from "typeorm";

export class CreateOrderDto{
    @Column()
    id_cart: string

    @Column()
    id_alamat: string

    @Column()
    id_card_detail : string
    
    @Column()
    total_hrg_brg: number;

    @Column()
    total_hrg_krm: number;

    @Column()
    total_order: number;
}