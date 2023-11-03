import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemId: string;

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

  get eactItemTotal(): number {
    return this.quantity * this.price;
  }
}
