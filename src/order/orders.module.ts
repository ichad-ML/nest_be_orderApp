import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersService } from 'src/user/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/Order.entity';
import { User } from 'src/entities/User.entity';
import { ItemService } from 'src/item/item.service';
import { Item } from 'src/entities/Item.entity';
import { OrderItem } from 'src/entities/OrderItem.entity';
import { OrderMiddleware } from 'src/middlewares/order-validation/order.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Item, OrderItem])],
  providers: [OrdersService, UsersService, ItemService],
  controllers: [OrdersController],
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OrderMiddleware).forRoutes({
      path: 'orders',
      method: RequestMethod.POST,
    });
  }
}
