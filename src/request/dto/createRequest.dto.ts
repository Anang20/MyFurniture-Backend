import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreateRequestDto{
    @IsNotEmpty()
    nama_produk: string

    @IsNotEmpty()
    quantity: number
}