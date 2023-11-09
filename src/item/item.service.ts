import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddItemDto } from 'src/dtos/AddItem.dto';
import { Item } from 'src/entities/Item.entity';
import { UsersService } from 'src/user/users.service';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepo: Repository<Item>,
    private userService: UsersService,
  ) {}

  addItem = async (
    id: string,
    addItem: AddItemDto,
  ): Promise<{ msg: string }> => {
    const { name, quantity, price } = addItem;

    try {
      const user = await this.userService.getUserById(id);
      const newItem = this.itemRepo.create({
        id: uuid(),
        name,
        quantity,
        price,
        user,
      });

      await this.itemRepo.save(newItem);
      return { msg: `Item: ${name} was added.` };
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  };

  getItemsByUserId = async (userId: string): Promise<Item[]> => {
    const items = await this.itemRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    return items;
  };

  deleteItem = async (
    userId: string,
    itemId: string,
  ): Promise<{ msg: string }> => {
    const item = await this.itemRepo.findOne({
      where: { id: itemId },
      relations: ['user'],
    });

    if (!item)
      throw new NotFoundException(`Item with id: ${itemId} not found!..`);

    try {
      await this.userService.getUserById(userId);
      if (userId === item.user.id) {
        await this.itemRepo.delete(item);
        return { msg: 'Item deleted!..' };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  };
}
