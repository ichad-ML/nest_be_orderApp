import {
  BadRequestException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { runTransaction } from 'dbConfig/db.transaction';
import { UpdateUserDto } from 'src/dtos/UpdateUser.dto';
import { User } from 'src/entities/User.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  getUsers = () => {
    return this.userRepo.find();
  };

  getUserById = async (id: string): Promise<User> => {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found!');
    return user;
  };

  updateUser = async (id: string, updateUser: UpdateUserDto) => {
    const foundUser = await this.getUserById(id);
    // foundUser.profileId = updateUser.profileId;
    // this.userRepo.save(foundUser);
  };

  deleteUser = async (id: string): Promise<{}> => {
    const foundUser = await this.getUserById(id);

    if (!foundUser) throw new NotFoundException();

    await runTransaction(
      this.entityManager,
      async (transactionalEntityManager) => {
        await transactionalEntityManager.delete(User, foundUser);
      },
    );

    return { msg: 'User deleted!' };
  };
}
