import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as moment from 'moment';
import { HttpException, HttpStatus } from '@nestjs/common';

export const editFileName = (req, file, callback) => {
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

export const editFileNameRegister = (req, file, callback) => {
  // const name = file.originalname.split('.')[0];
  const fileExtName = path.extname(file.originalname);
  const dir = `./uploads/profile`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // console.log(pic_name, "ini PIC name")
  // console.log(req);
  // const fileExtName = 'asdasd';
  // const randomName = Array(4)
  //   .fill(null)
  //   .map(() => Math.round(Math.random() * 16).toString(16))
  //   .join('');

  const d = new Date();

  if (['.png', '.jpg', '.jpeg', '.JPEG', '.JPG', '.PNG', '.pdf', '.PDF'].includes(fileExtName)) {
    callback(null, `profile/profile_${req.query.name}${fileExtName}`);
  } else {
    callback(new HttpException(`Unsupported file type ${path.extname(file.originalname)}, the document must be .pdf, .png, .jpg, or .jpeg`, HttpStatus.BAD_REQUEST), false)
  }
};

export const editFileNameExport = (req, file, callback) => {
  const fileExtName = path.extname(file.originalname);
  const fileName = file.originalname
  const dir = `./uploads`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const d = new Date();

  callback(null, `export/${fileName}`);
};
