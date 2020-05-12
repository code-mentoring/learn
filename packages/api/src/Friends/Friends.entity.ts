import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn, ManyToOne, Check } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { UserWithPassword, User } from '../User/User.entity';

@ObjectType()
@Entity()
@Unique('friendship', ['user1Id', 'user2Id'])
@Check(`"user1Id" < "user2Id"`)
export class Friends extends CMBaseEntity {
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
export class FriendsInput {

    @Field()
    user1Id: string;

    @Field()
    user2Id: string;
}
