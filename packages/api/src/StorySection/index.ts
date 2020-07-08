import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CMSModule } from '../CMS';
import { StorySection } from './StorySection.entity';
import { StorySectionResolver } from './StorySection.resolver';
import { StorySectionService } from './StorySection.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([StorySection]),
    CMSModule
  ],
  providers: [StorySectionResolver, StorySectionService]
})
export class StorySectionModule {}
