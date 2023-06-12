import { Module } from '@nestjs/common';
import { DogHealthService } from './dog-health.service';
import { DogHealthController } from './dog-health.controller';
import {TerminusModule} from "@nestjs/terminus";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [TerminusModule, HttpModule],
  providers: [DogHealthService],
  controllers: [DogHealthController]
})
export class DogHealthModule {}
