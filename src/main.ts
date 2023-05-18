import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000 }));
    app.enableCors();
    await app.listen(PORT, process.env.NODE_ENV === 'development' ? '0.0.0.0' : undefined, () => {
      console.log('ENVIRONMENT', process.env.NODE_ENV);
      console.log(`Server started on PORT ${PORT}`);
    });
  } catch (error: any) {
    console.log('[server] Error starting server: ', error);
  }
};

start();
