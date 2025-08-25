import { IsNotEmpty } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  client: string;

  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  address: string;
}
