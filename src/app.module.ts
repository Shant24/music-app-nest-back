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

export const filesStaticPath = path.resolve(__dirname, '../..', 'music-static-datas');

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: filesStaticPath,
    }),
    TrackModule,
    FileModule,
  ],
})

export class AppModule {}
