import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemDto } from 'src/dtos/AddOrder.dto';
import { Order } from 'src/entities/Order.entity';
import { OrderItem } from 'src/entities/OrderItem.entity';
import { User } from 'src/entities/User.entity';
import { ItemService } from 'src/item/item.service';
import { UsersService } from 'src/user/users.service';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    private userService: UsersService,
    private itemService: ItemService,
  ) {}

  getAllOrder = () => {
    return this.orderRepo.find();
  };

  addOrder = async (
    // userId: string,
    order: OrderItemDto[],
  ): Promise<{ msg: string }> => {
    // // const user = await this.userService.getUserById(userId);
    // console.log(order);
    const [{ itemName, quantity }] = order;

    const orderItems = await createOrderItems(order, this.orderItemRepo);

    const newOrder = this.orderRepo.create({
      date: new Date(),
      orderItem: orderItems,
      // user,
    });
    // await this.orderRepo.save(newOrder);

    return { msg: 'Ordered Successfully..' };
  };
}

// const createOrder = async (
//   order: OrderItemDto[],
//   orderRepo: Repository<Order>,
//   orderItemRepo: Repository<OrderItem>,
//   user: User,
// ): Promise<Order> => {
//   const orderItems = await createOrderItems(order, orderItemRepo);

//   const newOrder = orderRepo.create({
//     date: new Date(),
//     orderItem: orderItems,
//     user,
//   });
//   await orderRepo.save(newOrder);

//   return newOrder;
// };

const createOrderItems = async (
  order: OrderItemDto[],
  orderItemRepo: Repository<OrderItem>,
): Promise<OrderItem[]> => {
  const orderItems = order.map((item) => {
    const items = orderItemRepo.create({
      itemName: item.itemName,
      quantity: item.quantity,
    });
    return items;
  });

  await orderItemRepo.save(orderItems);
  return orderItems;
};
