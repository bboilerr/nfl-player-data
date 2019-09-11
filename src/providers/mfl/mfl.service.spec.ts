import { Test, TestingModule } from '@nestjs/testing';
import { MflService } from './mfl.service';

describe('MflService', () => {
  let service: MflService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MflService],
    }).compile();

    service = module.get<MflService>(MflService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
