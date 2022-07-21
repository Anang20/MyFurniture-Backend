import { IsNotEmpty, IS_UUID, MAX_LENGTH } from "class-validator";
import { Kecamatan } from "../entities/kecamatan.entity";
import { Kelurahan } from "../entities/kelurahan.entity";
import { Kota } from "../entities/kota.entity";
import { Provinsi } from "../entities/provinsi.entity";
import { User } from "../entities/user.entity";

export class CreateAlamatDto {

    @IsNotEmpty()
    id_kelurahan: number

    @IsNotEmpty()
    id_user: string

    @IsNotEmpty()
    alamat: string
    
    @IsNotEmpty()
    latitude: string

    @IsNotEmpty()
    longtitude: string

}