import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Kelurahan } from "./kelurahan.entity";
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
            return callBack.kecamatan;
        }
    )
    kota: Kota;

    @OneToMany(()=> Kelurahan, (callBack) => callBack.kecamatan)
    kelurahan: Kelurahan

    @Column()
    nama_kecamatan: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}