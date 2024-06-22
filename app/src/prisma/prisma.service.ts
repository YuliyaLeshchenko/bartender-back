import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    // url: "postgresql://postgres:root1@34.139.248.116:5434/bartender?schema=public"
                    url: "postgresql://postgres:root1@10.142.0.2:5434/bartender?schema=public"
                }
            }
        })
    }
}
