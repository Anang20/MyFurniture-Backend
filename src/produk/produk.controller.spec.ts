import { Test, TestingModule } from '@nestjs/testing';
import { ProdukController } from './produk.controller';

describe('ProdukController', () => {
  let controller: ProdukController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdukController],
    }).compile();

    controller = module.get<ProdukController>(ProdukController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
