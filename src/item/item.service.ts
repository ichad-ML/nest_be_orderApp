import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddItemDto } from 'src/dtos/AddItem.dto';
import { Item } from 'src/entities/Item.entity';
import { UsersService } from 'src/user/users.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepo: Repository<Item>,
    private userService: UsersService,
  ) {}

  addItem = async (id: string, addItem: AddItemDto): Promise<{}> => {
    const { name, quantity, price } = addItem;

    const user = await this.userService.getUserById(id);
    const newItem = await this.itemRepo.create({
      id: uuid(),
      name,
      quantity,
      price,
      user,
    });

    await this.itemRepo.save(newItem);
    return { msg: `Item: ${name} was added.` };
  };

  getItemsByUserId = async (userId: string) => {
    const items = await this.itemRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    return items;
  };
}
