import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from '../shared/services/prisma.service';


@Module({
  providers: [ClientService, PrismaService],
  controllers: [ClientController],
})
export class ClientModule {}