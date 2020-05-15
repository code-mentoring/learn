import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

import { CMBaseEntity } from '../lib/Base.entity';

@ObjectType()
@Entity('character')
@Unique(['name'])
@Unique(['displayName'])
export class Character extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  displayName: string;
}

@InputType()
export class CharacterInput {
  @Field()
  name: string;

  @Field()
  displayName: string;
}

@InputType()
export class CharacterIndex {
  // fields as query index. at least and at most one of them
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  displayName?: string;
}
