import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from '@prisma/client';
@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}
  @Post()
  create(@Body() clientData: Omit<Client, 'id'>): Promise<Client> {
    return this.clientService.create(clientData);
  }
  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    const client = await this.clientService.findOne(id);
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }
}
