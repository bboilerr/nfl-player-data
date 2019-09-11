/*tslint:disable variable-name*/
import { Injectable, Logger } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import * as mongoose from 'mongoose';

@Injectable()
export class MongoService {
    private logger: Logger;
    private _db: Db;
    private _mongoose: mongoose.Mongoose;

    constructor() {
        this.logger = new Logger('MongoService');
        this.start();
    }

    get db() {
        return this._db;
    }

    get mongoose() {
        return this._mongoose;
    }

    async start() {
        // Connection URL
        const dbName = 'nfl-player-data';
        const url = `mongodb://${process.env.DEV_MODE ? 'localhost' : 'nfl-player-data-mongo'}:27017`;

        // Connect mongoose
        await mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useCreateIndex: true } as any);
        const mongooseConnection = mongoose.connection;
        this.logger.log('Connected to mongoose');
        mongooseConnection.on('error', error => {
            this.logger.error(`Mongoose connection error: ${error}`);
        });
        this._mongoose = mongoose;

        // Connect mongoClient
        const mongoClient = await MongoClient.connect(url, { useNewUrlParser: true });
        this.logger.log('Connected to mongodb');

        this._db = mongoClient.db(dbName);
    }
}
