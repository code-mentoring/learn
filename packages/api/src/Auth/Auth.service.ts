import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import bcrypt from 'bcrypt';
import { User } from '../User/User.entity';
import { UserService } from '../User/User.service';
import { LoginOutput } from './Auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const valid = await new Promise(res => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) res(false);
        else res(result);
      });
    });

    if (!valid) return null;

    // eslint-disable-next-line
    const { password: p, ...result } = user;
    return result;
  }

  sign(user: User): LoginOutput {
    return {
      accessToken: this.jwtService.sign({
        user
      })
    };
  }

  verify(token: string) {
    return this.jwtService.verify(token);
  }
}
