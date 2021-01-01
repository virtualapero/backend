import {Test, TestingModule} from '@nestjs/testing';
import {AperoService} from './apero.service';

describe('AperoService', () => {
  let service: AperoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AperoService],
    }).compile();

    service = module.get<AperoService>(AperoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
