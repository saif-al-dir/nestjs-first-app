import { IsNotEmpty } from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  client: string;

  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  address: string;
}
