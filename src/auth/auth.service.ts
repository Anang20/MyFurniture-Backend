import { HttpException, Injectable } from '@nestjs/common';
import { generateString, InjectRepository } from '@nestjs/typeorm';
import { generate } from 'rxjs';
import { hashPassword } from 'src/helper/hash_password';
import { IsNull, Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/users/entities/role.entity';
import { query } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {
        
    }

    async register(request: RegisterDto) {
        try {
            const salt = generateString();
            const password = await hashPassword(request.password, salt);
            const data = new User()
            data.nama_lengkap = request.nama_lengkap;
            data.email = request.email;
            data.salt = salt;
            data.password = password;
            data.role= 2;
            data.no_telp=request.no_telp
            await this.userRepository.insert(data)
        } catch (e) {
            throw e;
        }
    }

    async login(request: LoginDto) {
        try {
            const existUser = await this.userRepository.findOne({
                relations: {
                    role: true
                },
                where: {
                    email: request.email,
                    deleted_at: IsNull()
                }
            });
            const { foto, password, salt, ...query} = existUser;

            const accessToken = this.jwtService.sign({
                query
            });


            if (existUser && existUser.password === await hashPassword(request.password, existUser.salt)) {
                return accessToken;
            } else {
                throw new HttpException ({
                    statusCode : 400,
                    message: 'Bad Request',
                    data: 'Email or password is wrong'                   
                }, 400)

            }
        } catch (e){
            throw e
        }
    }
}