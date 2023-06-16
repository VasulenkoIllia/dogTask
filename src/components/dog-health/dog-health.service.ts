import { Injectable } from '@nestjs/common';
import * as process from "process";
import {
    DiskHealthIndicator, HealthCheckResult,
    HealthCheckService, HttpHealthIndicator,
    MemoryHealthIndicator,
    SequelizeHealthIndicator
} from "@nestjs/terminus";

@Injectable()
export class DogHealthService {
    constructor(
        private health: HealthCheckService,
        private db: SequelizeHealthIndicator,
        private readonly disk: DiskHealthIndicator,
        private memory: MemoryHealthIndicator,
        private http: HttpHealthIndicator
    ) {}
   async checkServerStats():Promise<{message:string, healthCheck:HealthCheckResult}> {
        const healthCheck = await this.health.check([
            () => this.db.pingCheck('database', { timeout: 2000 }),
            () => this.disk.checkStorage('storage', { path: 'C:\\\\', thresholdPercent: 0.9 }),
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
            // () => this.http.pingCheck('HTTP', `http://${process.env.HOST}${process.env.PORT}`),
            // () => this.http.pingCheck('HTTPS', `https://${process.env.HOST}${process.env.PORT}`),
        ]);
        return {
            message: "Dogshouseservice.Version1.0.1",
            healthCheck

        }
    }


}
