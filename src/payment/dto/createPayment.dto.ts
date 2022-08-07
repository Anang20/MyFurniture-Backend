import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class CreatePaymentDto {
  @IsNotEmpty()
  @Column()
  nama_bank: string;

  @IsNotEmpty()
  @Column()
  no_rek: number;

  @IsNotEmpty()
  @Column()
  gambar: string

  @IsNotEmpty()
  @Column()
  id_order: string
}
