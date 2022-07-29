import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Kecamatan } from "./kecamatan.entity";
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
            return callBack.kota;
        }
    )
    provinsi: Provinsi;

    @OneToMany(
        () => {
            return Kecamatan;
        },
        (callBack) => {
            return callBack.kota;
        }
    )
    kecamatan: Kecamatan;

    @Column()
    nama_kota: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}