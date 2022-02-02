import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // global prefix
  app.setGlobalPrefix('api');
  // console.log(process.env.PORT);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server Running at http://localhost:${port}/`);
}
bootstrap();
