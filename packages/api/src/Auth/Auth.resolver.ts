import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { LoginOutput } from './Auth.entity';
import { AuthService } from './Auth.service';


@Resolver()
export class AuthResolver {

  constructor(private readonly authService: AuthService) { }

  @Mutation(() => LoginOutput)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const user = await this.authService.validateUser(email, password)
    if (!user) throw new Error('Invalid login credentials')
    return this.authService.sign(user);
  }
}
