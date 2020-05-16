import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from 'typeorm';
import { CMBaseEntity } from '../lib/Base.entity';
import { Module } from '../Module/Module.entity';

@ObjectType()
@Entity('concept')
@Unique(['name'])
export class Concept extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  icon: string;

  @Column()
  @Field()
  taughtInId: string;

  @ManyToOne(() => Module)
  @Field(() => Module)
  taughtIn: Module
}

@InputType()
export class CreateConceptInput {
  @Field()
  name: string;

  @Field()
  icon: string;

  @Field()
  description: string;

  @Field()
  taughtInId: string;
}

@InputType()
export class UpdateConceptInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  taughtInId?: string;
}
