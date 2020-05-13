import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, ManyToOne } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { UserWithPassword, User } from '../User/User.entity';

@ObjectType()
@Entity('friend_requests')
@Unique('fromto', ['fromId', 'toId'])
@Unique('fromto2', ['toId', 'fromId'])
export class FriendRequest extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  fromId: string;

  @Column()
  @Field()
  toId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  accepted: boolean;

  @CreateDateColumn()
  @Field()
  requested: Date;

  @ManyToOne(() => UserWithPassword)
  @Field(() => User)
  from: UserWithPassword;

  @ManyToOne(() => UserWithPassword)
  @Field(() => User)
  to: UserWithPassword;
}

@InputType()
export class FriendRequestInput {
  @Field()
  fromId: string;

  @Field()
  toId: string;
}

@InputType()
export class ConfirmRejectInput extends FriendRequestInput {

  @Field()
  id: string;

  @Field()
  accepted: boolean;
}
