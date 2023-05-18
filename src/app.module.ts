import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

import { AppLoggerMiddleware } from './middlewares/logger.middleware';
import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: path.resolve(
    __dirname,
    '..',
    require('fs').existsSync(`.env.${process.env.NODE_ENV}`) ? `.env.${process.env.NODE_ENV}` : '.env',
  ),
});

const MONGODB = process.env.MONGODB || '';

export const filesStaticPath = path.resolve(__dirname, '../..', 'static-datas');

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: filesStaticPath,
      serveRoot: '/static',
    }),
    TrackModule,
    FileModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
