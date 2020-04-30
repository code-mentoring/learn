import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, OneToOne } from 'typeorm';

import { PathUser } from '../PathUser/PathUser.entity';
import { UserPreferences } from '../UserPreferences/UserPreferences.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => UserPreferences, { nullable: true })
  userPreferences?: UserPreferences;

  @Field()
  createdAt: Date;
}

@Entity('user')
@Unique('Email', ['email'])
export class UserWithPassword extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PathUser, pathUser => pathUser.user)
  pathUser: PathUser[];

  @OneToOne(() => UserPreferences)
  userPreferences: UserPreferences;

}

@InputType()
export class UserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
