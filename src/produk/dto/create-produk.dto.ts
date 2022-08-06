import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProdukDto {

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
