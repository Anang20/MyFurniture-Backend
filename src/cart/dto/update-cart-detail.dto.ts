import { IsNotEmpty } from "class-validator";

export class UpdateCartDto{
    @IsNotEmpty()
    kuantiti: number
}