import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {

    constructor(private readonly prisma: PrismaService) { }

    async createUser(appId): Promise<any> {
        const user = await this.prisma.user.create({
            data: {
                appId: +appId,
            }
        });

        return user;
    }
}