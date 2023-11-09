import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AddItemDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1))
  name: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;
}
