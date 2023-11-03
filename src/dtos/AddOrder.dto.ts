import { IsNumber, IsString } from 'class-validator';

export class AddOrderDto {
  @IsString()
  item: string;

  @IsNumber()
  quantity: number;
}

export class AddOrderItemDto {
  @IsString()
  userId: string;

  @IsNumber()
  total: number;

  @IsString({ each: true })
  items: AddOrderDto[];
}
