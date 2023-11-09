import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { User } from 'src/entities/User.entity';
import { EntityManager, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { hashedPass, validatePass } from './encryptPass/password.crypt';
import { SignInAuthDto } from 'src/dtos/SignInAuth.dto';
import { JwtPayload } from './jwt-auth/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { runTransaction } from 'dbConfig/db.transaction';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  signin = async (signin: SignInAuthDto): Promise<{ accessToken: string }> => {
    const { email, password } = signin;

    const user = await this.userRepo.findOne({ where: { email } });

    if (user && (await validatePass(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    }

    throw new NotFoundException();
  };

  // signup = async (userDetails: CreateUserDto): Promise<{ msg: string }> => {
  //   const { username, email, password, role } = userDetails;
  //   const hashedPassword = await hashedPass(password);

  //   const newUser = await this.userRepo.create({
  //     id: uuid(),
  //     username,
  //     email,
  //     password: hashedPassword,
  //     role,
  //   });

  //   try {
  //     await this.userRepo.save(newUser);
  //   } catch (error) {
  //     throw new HttpException(error, HttpStatus.BAD_REQUEST);
  //   }

  //   return { msg: 'User has been created!' };
  // };

  signup = async (userDetails: CreateUserDto): Promise<{ msg: string }> => {
    const { username, email, password, role } = userDetails;
    const hashedPassword = await hashedPass(password);

    const newUser = await this.userRepo.create({
      id: uuid(),
      username,
      email,
      password: hashedPassword,
      role,
    });

    await runTransaction(
      this.entityManager,
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(newUser);
      },
    );

    return { msg: 'User has been created!..' };
  };
}
