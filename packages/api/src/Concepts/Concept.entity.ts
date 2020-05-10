import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { UserConcept } from '../UserConcepts/UserConcept.entity';
import { CMBaseEntity } from '../lib/Base.entity';

@ObjectType()
@Entity()
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

  @OneToMany(() => UserConcept, userConcept => userConcept.concept)
  userConcept: UserConcept[];
}

@InputType()
export class ConceptInput {
    @Field()
    name: string;

    @Field()
    icon: string;

    @Field()
    description: string;
}