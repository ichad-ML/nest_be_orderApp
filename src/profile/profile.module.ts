import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UsersService } from 'src/user/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entities/Profile.entity';
import { User } from 'src/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [ProfileController],
  providers: [ProfileService, UsersService],
})
export class ProfileModule {}
