import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Provinsi } from "./provinsi.entity";

@Entity()
export class Kota {
    @PrimaryColumn()
    id_kota: number;

    @ManyToOne(
        () => {
            return Provinsi;
        },
        (callBack) => {
            return callBack.id_provinsi;
        }
    )
    provinsi: Provinsi;

    @Column()
    nama_kota: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}