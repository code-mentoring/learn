import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, ManyToOne, Check } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { UserWithPassword } from '../User/User.entity';

@ObjectType()
@Entity('friend_requests')
@Unique('fromto', ['fromId', 'toId'])
@Check(`"fromId" <> "toId"`)
export class FriendRequests extends CMBaseEntity {
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
  from: UserWithPassword;

  @ManyToOne(() => UserWithPassword)
  to: UserWithPassword;
}

@InputType()
export class FriendRequestsInput {
  @Field()
  fromId: string;

  @Field()
  toId: string;
}

@InputType()
export class ConfirmRejectInput extends FriendRequestsInput {

  @Field()
  id: string;

  @Field()
  accepted: boolean;
}
