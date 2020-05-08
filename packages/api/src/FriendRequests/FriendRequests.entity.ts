import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, ManyToOne } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { UserWithPassword } from '../User/User.entity';

@ObjectType()
@Entity('friend_requests')
@Unique('fromto', ['from', 'to'])
export class FriendRequests extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  from: string;

  @Column()
  @Field()
  to: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  accepted: boolean;

  @CreateDateColumn()
  @Field()
  requested: Date;

  @ManyToOne(() => UserWithPassword, fromUser => fromUser.friendRequestsTo)
  fromUser: UserWithPassword;

  @ManyToOne(() => UserWithPassword, toUser => toUser.friendRequestsFrom)
  toUser: UserWithPassword;
}

@InputType()
export class FriendRequestsInput {
  @Field()
  from: string;

  @Field()
  to: string;

  @Field({nullable: true})
  accepted: boolean;
}
