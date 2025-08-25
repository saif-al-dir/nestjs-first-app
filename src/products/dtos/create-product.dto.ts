import { IsNotEmpty, IsString, IsInt, Min, Length } from 'class-validator';
import { Transform } from 'class-transformer'; // Ensure this is imported from class-transformer

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 30)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  description: string;
}
