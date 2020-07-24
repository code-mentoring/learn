import { Module } from '@nestjs/common';

import { CMSModule } from '../CMS';
import { StorySectionResolver } from './StorySection.resolver';


@Module({
  imports: [CMSModule],
  providers: [StorySectionResolver]
})
export class StorySectionModule {}
