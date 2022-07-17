import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Kota } from "./kota.entity";

@Entity()
export class Kecamatan{
    @PrimaryColumn()
    id_kecamatan: number;

    @ManyToOne(
        () => {
            return Kota;
        },
        (callBack) => {
            return callBack.id_kota;
        }
    )
    kota: Kota;

    @Column()
    nama_kecamatan: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}