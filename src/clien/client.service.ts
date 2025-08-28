import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Client } from '@prisma/client';
@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}
  create(data: Omit<Client, 'id'>): Promise<Client> {
    return this.prisma.client.create({ data });
  }
  findAll(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }
  findOne(id: string): Promise<Client | null> {
    return this.prisma.client.findUnique({ where: { id } });
  }
}
