// import { RolesModule } from './../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { User } from 'src/users/entities/user.entity';
import { Produk } from 'src/produk/entities/produk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Produk]), ConfigModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
