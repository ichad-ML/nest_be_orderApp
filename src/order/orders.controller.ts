import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderItemDto } from 'src/dtos/AddOrder.dto';
import { AuthGuard } from '@nestjs/passport';
import { CustomRequest } from 'src/middlewares/order-validation/custom-request';
import { GetUser } from 'src/auth/get-user/getUser.decorator';
import { User } from 'src/entities/User.entity';

@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  getAllOrder() {
    return this.orderService.getAllOrder();
  }

  @Post()
  addOrder(
    // @Param('id', ParseUUIDPipe) id: string,
    @Body() order: OrderItemDto[],
    @Req() req: CustomRequest,
    @GetUser() user: User,
  ) {
    // console.log('transform:', req.transformedData);

    return this.orderService.addOrder(order, user);
  }
}
