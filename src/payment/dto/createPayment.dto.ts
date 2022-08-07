import { Column } from 'typeorm';

export class CreatePaymentDto {
  @Column()
  nama_bank: string;

  @Column()
  no_rek: number;
}
