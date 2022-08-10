import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as moment from 'moment';
import path from 'path';
import { Produk } from 'src/produk/entities/produk.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid'
import { UpdateFotoDto } from './dto/updateFotoUser.dto';
@Injectable()
export class FileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Produk)
    private produkRepository: Repository<Produk>
  ){}
  async renameUploadFile(filename: string) {
    const filenameArr = filename.split('/');

    fs.rename(`./uploads/${filename}`, `./uploads/${filename}`, () => {
    });

    return filename;
  }

  async editFileName(req, file, callback) {
    // const name = file.originalname.split('.')[0];
    const fileExtName = path.extname(file.originalname);
    const user = req.user;
    const name = uuid.v4()
    const dir = `./uploads/`;
  
  
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }
  
    console.log(fileExtName, "fileExtName");
  
    const d = new Date();
  
    if (['.png', '.jpg', '.jpeg', '.JPEG', '.JPG', '.PNG', '.pdf', '.PDF'].includes(fileExtName)) {
      callback(
        null,
        `${name}_${moment().format('YYYYMMDDHHmmss')}${fileExtName}`,
      );
    } else {
      callback(new HttpException(`Unsupported file type ${path.extname(file.originalname)}, the document must be .pdf, .png, .jpg, or .jpeg`, HttpStatus.BAD_REQUEST), false)
    }
    
  };

  async updateFotoUser( id_user: string, updateFotoDto: UpdateFotoDto){
      const user = await this.userRepository.findOneOrFail({
        where: {
          id_user,
        }
      })
      user.foto = updateFotoDto.foto
      await this.userRepository.save(user)
      return await this.userRepository.findOneOrFail({
        where : {
          id_user
        }
      })
  }

  async updateFotoProduk(gambar: string, id_produk){
    const produk = await this.produkRepository.findOneOrFail(id_produk)
    produk.gambar = gambar
    await this.produkRepository.save(produk)
    return await this.produkRepository.findOneOrFail(id_produk)
}

}
