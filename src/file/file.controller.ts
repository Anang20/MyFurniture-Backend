import {editFileName, editFileNameExport, editFileNameRegister} from './../helper/file-handler';
import {
  Body,
  Catch,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileService } from './file.service';
import * as fs from 'fs';

@Catch(HttpException)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}


  @Get(':img')
  seeUploadedFile(
    @Request() req,
    @Param('img') image,
    @Res() res,
  ) {
    try {
      const folder = `uploads`;
      const file = __dirname + `/../../${folder}/${image}`;
      if (fs.existsSync(file)) {
        return res.sendFile(image, {
          root: `./${folder}`,
        });
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'File not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

    } catch (e) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'File not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success Upload File',
      data: {
        filename: await this.fileService.renameUploadFile(
          file.filename,
        ),
      },
    };
  }
}
