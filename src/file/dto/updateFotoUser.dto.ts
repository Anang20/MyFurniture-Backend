import { IsNotEmpty } from "class-validator";

export class UpdateFotoDto{
    @IsNotEmpty()
    foto: string
}