import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FantasyProsService } from './providers/fantasy-pros/fantasy-pros.service';
import { PlayersManagerService } from './services/players-manager/players-manager.service';
import { WeekService } from './services/week/week.service';
import { MflService } from './providers/mfl/mfl.service';
import { MongoService } from './services/mongo/mongo.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MflService, FantasyProsService, PlayersManagerService, WeekService, MongoService],
})
export class AppModule {}
