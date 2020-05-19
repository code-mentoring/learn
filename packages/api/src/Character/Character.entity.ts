/* eslint react/static-property-placement: 0 */
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

import { CMBaseEntity } from '../lib/Base.entity';
import { Path } from '../Path/Path.entity';

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

  @OneToOne(() => Path, path => path.character)
  @Field(() => Path, { nullable: true })
  path?: Path
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
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  displayName?: string;
}
