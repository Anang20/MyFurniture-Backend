import { IsNotEmpty, IsNumber, IsNumberString, max, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  nama_bank: string;

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(16)
  no_rek: string;

  @IsNotEmpty()
  gambar: string

  @IsNotEmpty()
  id_order: string
}
