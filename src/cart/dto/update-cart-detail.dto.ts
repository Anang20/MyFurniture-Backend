import { IsNotEmpty } from "class-validator";

export class UpdateCartDetailDto{
    @IsNotEmpty()
    kuantiti: number
}