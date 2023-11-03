import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { SignInAuthDto } from 'src/dtos/SignInAuth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signin(@Body() signin: SignInAuthDto) {
    return this.authService.signin(signin);
  }

  @Post('signup')
  signup(@Body(ValidationPipe) userDetails: CreateUserDto) {
    return this.authService.signup(userDetails);
  }
}
