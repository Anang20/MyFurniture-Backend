import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Kecamatan } from "./kecamatan.entity";

@Entity()
export class Kelurahan{
    @PrimaryColumn()
    id_kelurahan: number;

    @ManyToOne(
        () => {
            return Kecamatan;
        },
        (callBack) => {
            return callBack.id_kecamatan
        }
    )
    kecamatan: Kecamatan;

    @Column()
    nama_kelurahan: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}