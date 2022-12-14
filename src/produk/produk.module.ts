import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produk } from './entities/produk.entity';
import { ProdukController } from './produk.controller';
import { ProdukService } from './produk.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produk])],
  controllers: [ProdukController],
  providers: [ProdukService],
  exports :[ProdukService]
})
export class ProdukModule {}
