import { Test, TestingModule } from '@nestjs/testing';
import { FantasyProsService } from './fantasy-pros.service';

describe('FantasyProsService', () => {
  let service: FantasyProsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FantasyProsService],
    }).compile();

    service = module.get<FantasyProsService>(FantasyProsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
