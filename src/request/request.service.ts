import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
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

    async createRequest(id_user:string, createRequestDto: CreateRequestDto){
        const user = await this.userRepository.findOneOrFail({
            where: {
                id_user : id_user
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
        const req = await this.requestReporitory.find({
            relations:{
                user: true
            }
        })
        const data =[]
        req.map(async (value, i )=> {
           await data.push({
             No: i +1  ,
             tanggal : value.created_at.toDateString(),
             nama_lengkap: value.user.nama_lengkap,
             nama_produk : value.nama_produk,
             kuantiti:value.quantity,   
             id:value.id_request
        })
        })
        return await data
    }

    async remove(id_request:number){
        const request= await this.requestReporitory.findOneOrFail({
            where: {
                id_request: id_request
            }, relations: {
                user: true
            }
        })
        await this.requestReporitory.softDelete(request)
    }

}
