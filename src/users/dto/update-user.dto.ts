import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    @IsNotEmpty()   
    nama_lengkap: string;     
    
    @IsNotEmpty()   
    @IsEmail()   
    email:  string;    
    
    @IsNotEmpty()   
    no_telp: number;
    
    @IsOptional()
    foto: string

}
