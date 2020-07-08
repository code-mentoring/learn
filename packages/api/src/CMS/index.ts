import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CMS } from './CMS';
import { PathService } from '../Path/Path.service';
import { PathUser } from '../PathUser/PathUser.entity';
import { Path } from '../Path/Path.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PathUser, Path])
  ],
  providers: [CMS, PathService],
  exports: [CMS, PathService]
})
export class CMSModule { }
