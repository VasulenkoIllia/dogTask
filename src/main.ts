import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as process from "process";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('DOGS')
      .setDescription('Dogs_API')
      .setVersion('1')
      .addTag('API')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document,{
    explorer: true});
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true
  }));
  await app.listen(process.env.PORT);
}
bootstrap();
