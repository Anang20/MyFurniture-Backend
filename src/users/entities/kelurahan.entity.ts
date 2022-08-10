import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Alamat } from "./alamat.entity";
import { Kecamatan } from "./kecamatan.entity";

@Entity()
export class Kelurahan{
    @PrimaryColumn({type:'varchar'})
    id_kelurahan: number;

    @ManyToOne(
        () => {
            return Kecamatan;
        },
        (callBack) => {
            return callBack.kelurahan;
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

    @OneToMany(()=> Alamat, alamat => alamat.kelurahan)
    alamat: Alamat
}