import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    try {
      await this.profileRepo.save(userProfile);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return {
      msg: `Username ${user.username} profile details has been updated..`,
    };
  };
}
