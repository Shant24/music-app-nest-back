import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';

const MONGODB = process.env.MONGODB || 'mongodb://localhost:27017/music-app';

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
