import {
  Args, Mutation, Query, Resolver
} from '@nestjs/graphql';

import { LoginOutput, LogoutOutput } from './Auth.entity';
import { AuthService } from './Auth.service';


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => LoginOutput)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new Error('Invalid login credentials');
    return this.authService.sign(user);
  }

  @Query(() => Boolean)
  async verifyToken(
    @Args('accessToken') token: string
  ) {
    try {
      this.authService.verify(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  @Query(() => LogoutOutput)
  async logout() {
    return this.authService.signOut();
  }
}
