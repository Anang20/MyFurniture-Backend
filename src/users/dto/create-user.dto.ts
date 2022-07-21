import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';
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
  @Matches(/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^*-]).{8,}/)   
  password: string;    
  
  @IsOptional()
  foto: string;

}