import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column('float')
  price: number;

  @ManyToOne(() => User, (user) => user.items, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
