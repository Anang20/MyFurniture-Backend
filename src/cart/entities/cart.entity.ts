import { IsBoolean, IsNotEmpty } from "class-validator";
import { array, string } from "joi";
import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Cart{
    @PrimaryGeneratedColumn('uuid')
    id_cart : string

    @IsNotEmpty()
    id_user : string

    @IsNotEmpty()
    qty : number

    @IsBoolean()
    status : boolean

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}