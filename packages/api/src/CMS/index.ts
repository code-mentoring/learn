import { Module } from '@nestjs/common';

import { CMS } from './CMS';

@Module({
  providers: [CMS],
  exports: [CMS]
})
export class CMSModule { }
