import { Test, TestingModule } from '@nestjs/testing';
import { PlayersManagerService } from './players-manager.service';

describe('PlayersManagerService', () => {
  let service: PlayersManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersManagerService],
    }).compile();

    service = module.get<PlayersManagerService>(PlayersManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
