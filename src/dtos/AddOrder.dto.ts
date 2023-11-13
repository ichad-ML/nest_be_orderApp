import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderItemDto {
  @IsString()
  itemName: string;

  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  price: number;
}
