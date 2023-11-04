import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderItemDto } from 'src/dtos/AddOrder.dto';
import { AuthGuard } from '@nestjs/passport';

@UsePipes(new ValidationPipe())
// @UseGuards(AuthGuard('jwt'))
@Controller(':id/orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  getAllOrder() {
    return this.orderService.getAllOrder();
  }

  @Post()
  addOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() order: OrderItemDto[],
  ) {
    return this.orderService.addOrder(id, order);
  }
}
