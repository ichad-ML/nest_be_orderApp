import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/entities/User.entity';

export const GetUser = createParamDecorator((data, req): User => {
  const request = req.switchToHttp().getRequest();
  return request.user;
});
