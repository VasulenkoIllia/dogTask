import {Controller, Get} from '@nestjs/common';
import {DogHealthService} from "./dog-health.service";
import {HealthCheck, SequelizeHealthIndicator} from "@nestjs/terminus";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('health')
@Controller('dog-health')
export class DogHealthController {
    constructor(
        private dogHealthService: DogHealthService,
    ) {}
    @Get()
    @HealthCheck()
    check(){
        return this.dogHealthService.checkServerStats()
    }
}
