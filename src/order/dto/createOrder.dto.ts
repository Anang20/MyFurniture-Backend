import { Column } from "typeorm";

export class CreateOrderDto{
    @Column()
    id_cart: string

    @Column()
    id_alamat: string

    @Column('boolean')
    status: false
}