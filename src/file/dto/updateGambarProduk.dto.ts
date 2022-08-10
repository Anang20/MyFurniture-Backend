import { IsNotEmpty } from "class-validator";

export class UpdateGambarDto{
    @IsNotEmpty()
    gambar: string
}