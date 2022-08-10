import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class UpdateOngkirDto{
    @IsNotEmpty()
    @Column()
    jarak : number

    @IsNotEmpty()
    @Column()
    harga_kirim : number
}