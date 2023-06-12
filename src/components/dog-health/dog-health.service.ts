import { Injectable } from '@nestjs/common';
import * as process from "process";
import {
    DiskHealthIndicator,
    HealthCheckService, HttpHealthIndicator,
    MemoryHealthIndicator,
    SequelizeHealthIndicator
} from "@nestjs/terminus";
import {rootLogger} from "ts-jest";

@Injectable()
export class DogHealthService {
    constructor(
        private health: HealthCheckService,
        private db: SequelizeHealthIndicator,
        private readonly disk: DiskHealthIndicator,
        private memory: MemoryHealthIndicator,
        private http: HttpHealthIndicator
    ) {
    }
    checkServerStats() {
        return this.health.check([
            () => this.db.pingCheck('database'),
            () => this.disk.checkStorage('storage', { path: 'C:\\\\', thresholdPercent: 0.9 }),
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
            () => this.http.pingCheck('HTTP', `http://${process.env.HOST}${process.env.PORT}`),
            () => this.http.pingCheck('HTTPS', `https://${process.env.HOST}${process.env.PORT}`),
        ]);
    }

}
