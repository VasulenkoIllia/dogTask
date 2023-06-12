import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';
import Dog from "../../entities/dog.entity";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([Dog]),

  ],
  providers: [DogService],
  controllers: [DogController],
})
export class DogModule {}
