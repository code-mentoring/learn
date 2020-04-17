import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_data, [_root, _args, ctx, _info]) => ctx.req.user);
