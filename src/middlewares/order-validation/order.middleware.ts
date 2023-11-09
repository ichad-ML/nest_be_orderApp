import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Item } from 'src/entities/Item.entity';
import { Repository } from 'typeorm';
import { CustomRequest } from 'src/middlewares/order-validation/custom-request';

@Injectable()
export class OrderMiddleware implements NestMiddleware {
  constructor(@InjectRepository(Item) private itemRepo: Repository<Item>) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const [{ itemName, quantity: reqQuantity }] = req.body;
    const item = await this.itemRepo.find({ where: { name: itemName } });
    const capitalizedStr = itemName.replace(/^\w/, (match: string) =>
      match.toUpperCase(),
    );
    req.transformedData = {
      itemName: capitalizedStr,
      quantity: reqQuantity,
    };

    if (!item.length) throw new NotFoundException('Item does not exist');
    const [{ quantity: itemQuantity }] = item;

    if (reqQuantity > itemQuantity)
      throw new BadRequestException(
        'Our item quantity is less than to your order!',
      );

    next();
  }
}
