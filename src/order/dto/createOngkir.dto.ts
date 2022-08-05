import { Column } from "typeorm";

export class CreateOngkirDto{
    @Column()
    jarak : number

    @Column()
    harga_kirim : number
}