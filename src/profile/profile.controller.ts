import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AddProfileDetails } from 'src/dtos/AddProfileDetails.dto';
import { GetUser } from 'src/auth/get-user/getUser.decorator';
import { User } from 'src/entities/User.entity';

@Controller(':id/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('')
  @UsePipes(new ValidationPipe())
  addProfileDetails(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() addProfile: AddProfileDetails,
    @GetUser() user: User,
  ) {
    console.log('tests 1');
    return this.profileService.addProfileDetails(user, addProfile);
    console.log('tests 2');
    console.log('tests 3');
    console.log('tests 4');
  }
}
