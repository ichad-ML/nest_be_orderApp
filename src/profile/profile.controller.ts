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

@Controller(':id/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('')
  @UsePipes(new ValidationPipe())
  addProfileDetails(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() addProfile: AddProfileDetails,
  ) {
    return this.profileService.addProfileDetails(id, addProfile);
  }
}
