import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            secretOrKey: 'topSecret20',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: any) {
        const existUserData = await this.userRepository.findOne({
            where: {
                email: payload.email
            }
        });
        if (!existUserData) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'UNAUTHORIZED',
                data: 'Token is invalid'
            },
            HttpStatus.UNAUTHORIZED);
        }

        return existUserData;
    }
}