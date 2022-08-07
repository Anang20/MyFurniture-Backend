import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/createRequest.dto';
import { Request } from './entity/request.entity';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(Request)
        private requestReporitory: Repository<Request>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async createRequest(createRequestDto: CreateRequestDto){
        const user = await this.userRepository.findOneOrFail({
            where: {
                id_user : createRequestDto.id_user
            }
        })
        const hasil = new Request()
        hasil.nama_produk= createRequestDto.nama_produk
        hasil.quantity = createRequestDto.quantity
        hasil.user = user
        await this.requestReporitory.insert(hasil)
        return await this.requestReporitory.findOneOrFail({
            where: {
                id_request: hasil.id_request
            }
        })
    }

    async findAll(){
        return await this.requestReporitory.findAndCount()
    }

    async remove(id_request:number){
        const request= await this.requestReporitory.findOneOrFail({
            where: {
                id_request: id_request
            }
        })
        await this.requestReporitory.softDelete(request)
    }

}
