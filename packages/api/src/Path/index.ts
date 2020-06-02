import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PathUser } from '../PathUser/PathUser.entity';
import { Path } from './Path.entity';
import { PathResolver } from './Path.resolver';
import { PathService } from './Path.service';
import { CharacterService } from '../Character/Character.service';
import { Character } from '../Character/Character.entity';
import { UserModule } from '../UserModule/UserModule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Path, PathUser, Character, UserModule])
  ],
  providers: [PathResolver, PathService, CharacterService],
  exports: [PathService]
})
export class PathModule {}
