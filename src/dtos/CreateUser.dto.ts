import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum([Role.CUSTOMER, Role.SELLER], {
    message: `each value in role must be one of the following values: ${Role.CUSTOMER} | ${Role.SELLER}`,
    each: true,
  })
  @IsNotEmpty()
  role: Role;
}
