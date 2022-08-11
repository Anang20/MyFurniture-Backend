import { IsNotEmpty } from "class-validator";

export class CreateCartDetailDto{
    @IsNotEmpty()
    kuantiti: number
}   