import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {AppDataSource} from "./data-source";

@Module({
  imports: [
      ConfigModule.forRoot(),
      SequelizeModule.forRoot(AppDataSource)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
