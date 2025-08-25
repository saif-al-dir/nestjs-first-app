import { Injectable } from '@nestjs/common';
import { db, Product } from './../db';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDTO } from './dtos/create-product.dto';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  }

  public getById(id: Product['id']): Product | null {
    return db.products.find((p) => p.id === id) || null;
  }

  public create(productData: CreateProductDTO): Product {
    const newProduct = { ...productData, id: uuidv4() };
    db.products.push(newProduct);
    return newProduct;
  }

  public deleteById(id: Product['id']): void {
    db.products = db.products.filter((product) => product.id !== id);
  }

  public updateById(id: Product['id'], productData: Omit<Product, 'id'>): void {
    db.products = db.products.map((p) => {
      if (p.id === id) {
        return { ...p, ...productData };
      }
      return p;
    });
  }
}
