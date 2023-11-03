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
import { ItemService } from './item.service';
import { AddItemDto } from 'src/dtos/AddItem.dto';
import { AuthGuard } from '@nestjs/passport';

@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard('jwt'))
@Controller('items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post(':id')
  addItem(@Param('id', ParseUUIDPipe) id: string, @Body() addItem: AddItemDto) {
    console.log(typeof id);

    return this.itemService.addItem(id, addItem);
  }

  @Get(':id')
  getItemsByUserId(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemService.getItemsByUserId(id);
  }
}
