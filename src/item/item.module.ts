import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Item } from 'src/entities/Item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { UsersService } from 'src/user/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, User])],
  providers: [ItemService, UsersService],
  controllers: [ItemController],
})
export class ItemModule {}
