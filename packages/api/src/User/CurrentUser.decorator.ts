import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_data, [, , ctx]) => ctx.req.user);
