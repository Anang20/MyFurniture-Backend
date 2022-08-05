import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Alamat } from './entities/alamat.entity';
import { Kelurahan } from './entities/kelurahan.entity';
import { Kota } from './entities/kota.entity';
import { Kecamatan } from './entities/kecamatan.entity';
import { Provinsi } from './entities/provinsi.entity';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Alamat, Kelurahan, Kecamatan, Kota, Provinsi]), CartModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
