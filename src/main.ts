import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PlayersManagerService } from './services/players-manager/players-manager.service';
import { MongoClient } from 'mongodb';
import * as mongoose from 'mongoose';
import { Logger } from '@nestjs/common';
import { MflService } from './providers/mfl/mfl.service';
import { FantasyProsService } from './providers/fantasy-pros/fantasy-pros.service';

const logger = new Logger('Main');

// tslint:disable-next-line:no-floating-promises
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
