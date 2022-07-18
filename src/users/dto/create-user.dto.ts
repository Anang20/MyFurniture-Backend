import { IsNotEmpty } from 'class-validator';
import { Role } from '../entities/role.entity';

export class CreateUserDto {
  @IsNotEmpty()
  id_user: string;

  @IsNotEmpty()
  nama_lengkap: string;

  @IsNotEmpty()
  email: string;

  no_telp: string;

  @IsNotEmpty()
  password: string;

  foto: string;

}
