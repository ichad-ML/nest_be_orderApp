import { IsNumber, IsString, Min } from 'class-validator';

export class AddProfileDetails {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsNumber()
  @Min(18)
  age?: number;
}
