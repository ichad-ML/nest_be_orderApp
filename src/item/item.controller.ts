import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { AddItemDto } from 'src/dtos/AddItem.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user/getUser.decorator';
import { User } from 'src/entities/User.entity';

@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard('jwt'))
@Controller('users/:userId/items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post()
  addItem(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() addItem: AddItemDto,
    @GetUser() user: User,
  ) {
    return this.itemService.addItem(user, addItem);
  }

  @Get()
  getItemsByUserId(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.itemService.getItemsByUserId(userId);
  }

  @Delete(':itemId')
  deleteItem(
    @Param('userId') userId: string,
    @Param('itemId') itemId: string,
  ): Promise<{ msg: string }> {
    return this.itemService.deleteItem(userId, itemId);
  }
}
