import { IsNotEmpty } from "class-validator";

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