import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '@prisma/client';
// import { CreateOrderDTO } from './dtos/create-order.dto';
// import { UpdateOrderDTO } from './dtos/update-order.dto';
// import { ParseUUIDPipe } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll() {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Post('/')
  async create(
    @Body() orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Order not found');
    await this.ordersService.updateById(id, orderData);
    return { success: true };
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Order not found');
    await this.ordersService.deleteById(id);
    return { success: true };
  }
}
