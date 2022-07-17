import { PartialType } from '@nestjs/mapped-types';
import { CreateProdukDto } from './create-produk.dto';

export class UpdateProdukDto extends PartialType(CreateProdukDto) {}