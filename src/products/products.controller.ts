import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './../db';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }

  @Post('/')
  create(@Body() productData: Omit<Product, 'id'>) {
    return this.productsService.create(productData);
  }
}

