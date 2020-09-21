import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { PathUser } from '../PathUser/PathUser.entity';
import { UserPreferences } from '../UserPreferences/UserPreferences.entity';
import { UserModule } from '../UserModule/UserModule.entity';

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

  @Field()
  profileImage: string;

  @Field(() => UserPreferences, { nullable: true })
  userPreferences?: UserPreferences;

  @Field()
  createdAt: Date;

  @Field()
  streak: number;
}

@Entity('user')
@Unique('Email', ['email'])
export class UserWithPassword extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  profileImage: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  streak: number;

  @Column({ nullable: true })
  updatedStreak?: Date;

  @OneToMany(() => PathUser, pathUser => pathUser.user)
  pathUser: PathUser[];

  @OneToMany(() => UserModule, userModules => userModules.user)
  userModules: UserModule[];

  @OneToOne(() => UserPreferences)
  userPreferences: UserPreferences;

  setStreak(s: number) {
    this.streak = s;
    this.updatedStreak = new Date();
    return this.save();
  }
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
