import { IsNotEmpty, MinLength, MaxLength, Matches } from "class-validator";

export class UpdatePasswordDto {
    @IsNotEmpty()   
    @MinLength(8)
    @MaxLength(30)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).*$/) 
    password: string; 
}