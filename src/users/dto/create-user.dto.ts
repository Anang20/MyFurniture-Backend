import { IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { Role } from '../entities/role.entity';

export class CreateUserDto {
  @IsNotEmpty()   
  nama_lengkap: string;     
  
  @IsNotEmpty()   
  @IsEmail()   
  email:  string;    
  
  @IsNotEmpty()   
  no_telp: number;    
  
  @IsNotEmpty()   
  @MinLength(8)
  @MaxLength(30)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).*$/) 
  password: string;    
  
  @IsOptional()
  foto: string;

}