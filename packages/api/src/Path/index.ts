import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Character } from '../Character/Character.entity';
import { CharacterService } from '../Character/Character.service';
import { PathUser } from '../PathUser/PathUser.entity';
import { PathUserService } from '../PathUser/PathUser.service';
import { Path } from './Path.entity';
import { PathResolver } from './Path.resolver';
import { PathService } from './Path.service';
import { CMS } from '../CMS/CMS';

@Module({
  imports: [
    TypeOrmModule.forFeature([Path, PathUser, Character])
  ],
  providers: [PathResolver, PathService, CharacterService, PathUserService, CMS],
  exports: [PathService]
})
export class PathModule {}
