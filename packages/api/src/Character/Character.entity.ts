/* eslint react/static-property-placement: 0 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

import { CMBaseEntity } from '../lib/Base.entity';

@ObjectType()
@Entity('character')
export class Character extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  displayName: string;
}

@InputType()
export class CreateCharacterInput {
  @Field()
  name: string;

  @Field()
  displayName: string;
}

@InputType()
export class UpdateCharacterInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  displayName?: string;
}
