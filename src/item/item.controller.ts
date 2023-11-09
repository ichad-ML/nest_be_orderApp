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

@UsePipes(new ValidationPipe())
// @UseGuards(AuthGuard('jwt'))
@Controller('users/:userId/items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post()
  addItem(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() addItem: AddItemDto,
  ) {
    return this.itemService.addItem(userId, addItem);
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
