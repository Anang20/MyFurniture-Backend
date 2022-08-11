import { Body, Controller, DefaultValuePipe, Delete, Get, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { Produk } from './entities/produk.entity';
import { ProdukService } from './produk.service';
import { AuthGuard } from '@nestjs/passport';


const path = require('path');

export const storage = {
  storage: diskStorage({
    destination: './public/img/produk',
    filename: (req, file, callback) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      callback(null, `${filename}${extension}`)
    },
  })
}

@Controller('produk')
export class ProdukController {
    constructor(private readonly produkService: ProdukService) {}

    // tambah produk
  @Post()
  async create(@Body() createProdukDto: CreateProdukDto){
        return {
          data: await this.produkService.create(
            createProdukDto
          ),
          statusCode: HttpStatus.CREATED,
          message: 'success',
        };
      }
      
  // Mencari produk
  @Get('/search/produk')
  async findProduk(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number = 5,
    @Query('search') search: string,
  ): Promise<Pagination<Produk>> {
    limit = limit > 100 ? 100 : limit;
    return this.produkService.findProduk(
      { page, limit, route: '/produk' },
      search,
    );
  }


  // mendapatkan data produk berdasarkan id
  @Get(':id_produk')
  async findOne(@Param('id_produk', ParseUUIDPipe) id_produk: string) {
    return {
      data: await this.produkService.findOne(id_produk),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  // mengedit produk
  @UseGuards(AuthGuard('jwt'))
  @Put(':id_produk')
  @UseInterceptors(FileInterceptor('gambar', storage))
  async update(
    @Param('id_produk', ParseUUIDPipe) id_produk: string,
    @Body() updateProdukDto: UpdateProdukDto,
    @UploadedFile() gambar: Express.Multer.File,
    @Request() req,
  ) {
    return {
      data: await this.produkService.update(
        req,
        id_produk,
        updateProdukDto,
        gambar.filename,
      ),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }


  // menghapus produk
  @Delete(':id_produk')
  async remove(@Param('id_produk', ParseUUIDPipe) id_produk: string) {
    await this.produkService.remove(id_produk);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  // mendapatkan semua data produk dan filter,paginate produk
  @Get()
  async index(
    @Query('page') page = 1,
    @Query('limit') limit = 14,
    @Query('nama_produk') nama_produk: string,
  ): Promise<Pagination<Produk>> {
    limit = limit > 100 ? 100 : limit; 

    let data;

    if(nama_produk === null || nama_produk === undefined) {
        data = this.produkService.paginate({
            page: Number(page),
            limit: Number(limit),
            route: '/nama_produk',
        });
    } else {
        data = this.produkService.paginateFilter(
            {
                page: Number(page),
                limit: Number(limit),
                route: '/nama_produk',
            },
            nama_produk
        );
    }
    return data;
  }
}
