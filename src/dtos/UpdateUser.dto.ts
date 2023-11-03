import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  profileId?: number;
}
