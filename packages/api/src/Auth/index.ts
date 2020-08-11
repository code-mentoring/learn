import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import config from 'config';
import { UserModule } from '../User';
import { AuthResolver } from './Auth.resolver';
import { AuthService } from './Auth.service';
import { JWTStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: config.get('auth.jwtSecret'),
      signOptions: { expiresIn: '1h' }
    })
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, JWTStrategy],
  exports: [AuthService, PassportModule]
})
export class AuthModule {}
