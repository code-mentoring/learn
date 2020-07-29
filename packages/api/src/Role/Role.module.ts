import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { PassportModule } from '@nestjs/passport';
import { RoleService } from './Role.service';
import { RoleResolver } from './Role.resolver';
import { Role } from './Role.entity';
import { AuthModule } from '../Auth';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  providers: [RoleService, RoleResolver],
  exports: [RoleService]
})
export class RoleModule {}
