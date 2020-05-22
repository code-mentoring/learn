import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn, ManyToOne } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { UserWithPassword, User } from '../User/User.entity';

export enum FriendStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}

registerEnumType(FriendStatus, {
  name: 'FriendStatus'
});

@ObjectType()
@Entity('friend')
@Unique('friend_rel', ['user1Id', 'user2Id'])
export class Friend extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  user1Id: string;

  @Column()
  @Field()
  user2Id: string;

  @CreateDateColumn()
  @Field()
  requested: Date;

  @Column({ type: 'simple-enum', enum: FriendStatus, default: FriendStatus.pending })
  @Field()
  status: FriendStatus;

  @Column()
  @Field()
  initiator: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  since: Date;

  @ManyToOne(() => UserWithPassword)
  @Field(() => User)
  user1: UserWithPassword;

  @ManyToOne(() => UserWithPassword)
  @Field(() => User)
  user2: UserWithPassword;
}

@InputType()
export class UpdateFriendInput {

  @Field()
  user1Id: string;

  @Field()
  user2Id: string;

  @Field({ nullable: true })
  requested?: Date;

  @Field({ nullable: true })
  status?: FriendStatus;

  @Field({ nullable: true })
  initiator?: string;

  @Field({ nullable: true })
  since?: Date;
}

@ObjectType()
export class FriendOutput {
  @Field()
  id: string;

  @Field()
  user1Id: string;

  @Field()
  user2Id: string;

  @Field()
  requested: Date;

  @Field()
  status: FriendStatus;

  @Field()
  initiator: string;

  @Field({ nullable: true })
  since: Date;
}
