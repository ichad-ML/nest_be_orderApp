import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  _no: number;

  @Column()
  itemName: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItem, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  order: Order;

  @Column()
  subTotal: number;

  get calculateTotal(): number {
    return this.quantity * 3;
  }
}
