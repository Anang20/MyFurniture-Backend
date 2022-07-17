import { IsNotEmpty } from 'class-validator';

export class CreateProdukDto {

  @IsNotEmpty()
  gambar: string;

  @IsNotEmpty()
  nama_produk: string;

  @IsNotEmpty()
  harga: number;

  @IsNotEmpty()
  deskripsi: string;

  @IsNotEmpty()
  stok: number;

}
