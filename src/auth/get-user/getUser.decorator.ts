import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/entities/User.entity';

export const GetUser = createParamDecorator((data, req) => {
  const request = req.switchToHttp().getRequest();
  console.log(req);

  // return request.user;
});
