import {Test, TestingModule} from '@nestjs/testing';
import {AperoController} from './apero.controller';

describe('AperoController', () => {
  let controller: AperoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AperoController],
    }).compile();

    controller = module.get<AperoController>(AperoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
