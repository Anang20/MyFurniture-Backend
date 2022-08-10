import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    nama_lengkap: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()     
    @MinLength(11)
    @MaxLength(13)
    no_telp: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(30)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).*$/)
    password: string;
}
