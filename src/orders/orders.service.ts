import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';
// import { db, Order } from './../db';
// import { v4 as uuidv4 } from 'uuid';
// import { CreateOrderDTO } from './dtos/create-order.dto'; // Ensure this DTO exists
// import { UpdateOrderDTO } from './dtos/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public async getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: {
        product: true,
        client: true, // Include client information
      },
    });
  }

  public async getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: {
        product: true,
        client: true, // Include client information
      },
    });
  }

  public async deleteById(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public async create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> & {
      clientId: string | null;
      productId: string | null;
    },
  ): Promise<Order> {
    const { productId, clientId, ...otherData } = orderData;
    return this.prismaService.order.create({
      data: {
        ...otherData,
        ...(productId ? { product: { connect: { id: productId } } } : {}),
        ...(clientId ? { client: { connect: { id: clientId } } } : {}),
      },
      include: {
        product: true,
      },
    });
  }

  public async updateById(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> & {
      clientId: string | null;
      productId: string | null;
    },
  ): Promise<Order> {
    const { productId, clientId, ...otherData } = orderData;
    return this.prismaService.order.update({
      where: { id },
      data: {
        ...otherData,
        ...(productId ? { product: { connect: { id: productId } } } : {}),
        ...(clientId ? { client: { connect: { id: clientId } } } : {}),
      },
      include: {
        product: true,
        client: true,
      },
    });
  }
}
