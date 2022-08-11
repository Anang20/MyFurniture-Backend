import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreateOrderDto{
    @IsNotEmpty()
    id_cart: string

    @IsNotEmpty()
    id_alamat: string
    
    @IsNotEmpty()
    total_hrg_brg: number;

    @IsNotEmpty()
    total_hrg_krm: number;

    @IsNotEmpty()
    total_order: number;
}