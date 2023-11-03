import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddOrderDto, AddOrderItemDto } from 'src/dtos/AddOrder.dto';
import { Order } from 'src/entities/Order.entity';
import { OrderItem } from 'src/entities/OrderItem.entity';
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
    userId: string,
    addOrder: AddOrderItemDto[],
  ): Promise<{ msg: string }> => {
    // const order_items = addOrder.map((item, quantity) => {
    //   const orderItem = this.orderItemRepo.create({
    //     itemId,
    //     itemName: item,
    //     quantity,
    //     price: 0,
    //     order
    //   });
    //   return orderItem;
    // });
    // console.log(order_items);

    // await this.orderItemRepo.save(order_items);
    return { msg: 'Ordered Successfully..' };
  };
}
