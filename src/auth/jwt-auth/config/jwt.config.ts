import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../jwt-payload.interface';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'agent-03',
    });
  }

  validate = async (payload: JwtPayload) => {
    const { email } = payload;
    console.log(email);

    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) throw new BadRequestException();

    return user;
  };
}
