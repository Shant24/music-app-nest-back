import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import * as dotenv from 'dotenv';

import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';

dotenv.config();

const MONGODB = process.env.MONGODB || '';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    TrackModule,
    FileModule,
  ],
})
export class AppModule {}
