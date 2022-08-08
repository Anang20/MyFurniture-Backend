import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Kota } from "./kota.entity";

@Entity()
export class Provinsi {
    @PrimaryColumn()
    id_provinsi: number;

    @Column()
    nama_provinsi: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(
        () => {
            return Kota;
        },
        (callBack) => {
            return callBack.provinsi;
        }, 
    )
    kota: Kota;
}