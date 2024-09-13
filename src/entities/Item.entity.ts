import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // comment 1
  name: string;

  @Column() // comment 2
  quantity: number;

  @Column('float')
  price: number;

  @ManyToOne(() => User, (user) => user.items, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
