import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreateRequestDto{
    @IsNotEmpty()
    @Column()
    id_user: string

    @IsNotEmpty()
    @Column()
    nama_produk: string

    @IsNotEmpty()
    @Column()
    quantity: number
}