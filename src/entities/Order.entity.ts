import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';
import { OrderItem } from './OrderItem.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  order_id: string;

  @Column()
  date: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItem: OrderItem;

  @ManyToOne(() => User, (user) => user.orders, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
