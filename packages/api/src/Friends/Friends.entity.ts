import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn, ManyToOne } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { UserWithPassword } from '../User/User.entity';

@ObjectType()
@Entity()
@Unique('friendship', ['user1Id', 'user2Id'] )
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
    
    @ManyToOne(() => UserWithPassword, user1 => user1.friends)
    user1: UserWithPassword; 

    @ManyToOne(() => UserWithPassword, user2 => user2.friends)
    user2: UserWithPassword; 
}

@InputType()
export class FriendsInput {

    @Field()
    user1Id: string;

    @Field()
    user2Id: string;
}
