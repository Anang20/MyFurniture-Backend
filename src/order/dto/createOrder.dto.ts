import { IsArray, isArray, IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreateOrderDto{
    @IsNotEmpty()
    @IsArray()
    id_cart:[]

    @IsNotEmpty()
    id_alamat: string
    
    @IsNotEmpty()
    total_hrg_brg: number;

    @IsNotEmpty()
    total_hrg_krm: number;

    @IsNotEmpty()
    total_order: number;
}