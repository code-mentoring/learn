import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn, ManyToOne, Check } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { UserWithPassword, User } from '../User/User.entity';

export enum FriendshipStatus {
  pending,
  accepted,
  rejected,
}

registerEnumType(FriendshipStatus, {
  name: 'FriendshipStatus'
});

@ObjectType()
@Entity('friendship')
@Unique('friend', ['user1Id', 'user2Id'])
@Check(`"user1Id" < "user2Id"`)
export class Friendship extends CMBaseEntity {
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

    // either user1Id or user2Id who initiate the request
    @Column()
    @Field()
    initiator: string;

    @Column()
    @Field()
    status: FriendshipStatus;

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

@ObjectType()
export class FriendRequestInput {
    @Field()
    user1Id: string;

    @Field()
    user2Id: string;

    @Field()
    since: Date;

    @Field()
    status: FriendshipStatus;

    @Field()
    initiator: string;
}

@InputType()
export class ConfirmRejectInput {

  @Field()
  id: string;

  @Field()
  accepted: boolean;
}

@ObjectType()
export class UserFriendshipOutput {
    @Field()
    id: string;

    @Field()
    userId: string;

    @Field()
    since: Date;

    @Field()
    status: FriendshipStatus;

    @Field()
    requested: Date;

    @Field()
    initiator: string;

    @Field()
    userFriend: User;
}
