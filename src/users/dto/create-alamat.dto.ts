import { IsNotEmpty, IS_UUID } from "class-validator";
import { Kecamatan } from "../entities/kecamatan.entity";
import { Kelurahan } from "../entities/kelurahan.entity";
import { Kota } from "../entities/kota.entity";
import { Provinsi } from "../entities/provinsi.entity";

export class CreateAlamatDto {
    @IsNotEmpty()
    nama_provinsi: string;

    @IsNotEmpty()
    nama_kota: string

    @IsNotEmpty()
    nama_kecamatan: string

    @IsNotEmpty()
    nama_kelurahan: string

    @IsNotEmpty()
    id_user: string

    @IsNotEmpty()
    alamat: string

    @IsNotEmpty()
    latitude: string

    @IsNotEmpty()
    longtitude: string
}