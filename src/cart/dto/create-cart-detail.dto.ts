import { IsNotEmpty } from "class-validator";

export class CreateCartDto{
    @IsNotEmpty()
    kuantiti: number
}   