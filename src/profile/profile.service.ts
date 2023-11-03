import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddProfileDetails } from 'src/dtos/AddProfileDetails.dto';
import { Profile } from 'src/entities/Profile.entity';
import { UsersService } from 'src/user/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    private userService: UsersService,
  ) {}

  addProfileDetails = async (
    id: string,
    addProfile: AddProfileDetails,
  ): Promise<{}> => {
    const { firstName, lastName, age } = addProfile;
    const user = await this.userService.getUserById(id);

    const userProfile = await this.profileRepo.create({
      firstName,
      lastName,
      age,
      createdAt: new Date(),
      updatedAt: new Date(),
      user,
    });

    await this.profileRepo.save(userProfile);

    return {
      msg: `Username ${user.username} profile details has been updated..`,
    };
  };
}
