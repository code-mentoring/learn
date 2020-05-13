import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn, ManyToOne } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { UserWithPassword, User } from '../User/User.entity';

@ObjectType()
@Entity('friend')
@Unique('friendship', ['user1Id', 'user2Id'])
@Unique('friendship2', ['user2Id', 'user1Id'])
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
    since: Date;

    @ManyToOne(() => UserWithPassword)
    @Field(() => User)
    user1: UserWithPassword;

    @ManyToOne(() => UserWithPassword)
    @Field(() => User)
    user2: UserWithPassword;
}

@InputType()
export class FriendInput {

    @Field()
    user1Id: string;

    @Field()
    user2Id: string;
}

@ObjectType()
export class UserFriendOutput {
    @Field()
    id: string;

    @CreateDateColumn()
    @Field()
    since: Date;

    @Field()
    userFriend: User;
}
