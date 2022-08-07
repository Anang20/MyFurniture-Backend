import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Request } from './entity/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Request])],
  providers: [RequestService],
  controllers: [RequestController]
})
export class RequestModule {}
