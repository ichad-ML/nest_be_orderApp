import { Role } from 'src/enums/role.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Item } from './Item.entity';
import { Profile } from './Profile.entity';
import { Order } from './Order.entity';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @OneToMany(() => Item, (items) => items.user)
  items: Item[];

  @OneToMany(() => Order, (orders) => orders.user)
  orders: Order[];

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;
}
