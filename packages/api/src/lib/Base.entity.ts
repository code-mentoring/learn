import { validateOrReject } from 'class-validator';
import { BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';


export class CMBaseEntity extends BaseEntity {
  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
