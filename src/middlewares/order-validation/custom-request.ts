import { Request } from 'express';

export interface CustomRequest extends Request {
  transformedData?: {
    itemName: string;
    quantity: number;
  };
}
