import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.session.user;

  return data ? user && user[data] : user;
});
export default User;