import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MflService } from './mfl/mfl.service';
import { FantasyProsService } from './fantasy-pros/fantasy-pros.service';
import { PlayersManagerService } from './players-manager/players-manager.service';
import { MflService } from './providers/mfl/mfl.service';
import { FantasyProsService } from './providers/fantasy-pros/fantasy-pros.service';
import { PlayersManagerService } from './services/players-manager/players-manager.service';
import { WeekService } from './services/week/week.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MflService, FantasyProsService, PlayersManagerService, WeekService],
})
export class AppModule {}
