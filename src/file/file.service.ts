import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as moment from 'moment';
import path from 'path';
import * as uuid from 'uuid'
@Injectable()
export class FileService {
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

}
