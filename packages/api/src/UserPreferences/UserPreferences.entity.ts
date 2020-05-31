import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique, OneToOne, JoinColumn } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { UserWithPassword, User } from '../User/User.entity';

@ObjectType()
@Entity()
@Unique(['userId'])
export class UserPreferences extends CMBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    userId: string;

    @Column()
    @Field()
    @IsInt()
    @Min(1)
    @Max(4)
    practiceGoal: number;

    @Column()
    @Field()
    why: string;

    @Column()
    @Field()
    @IsInt()
    @Min(0)
    @Max(10)
    codingAbility: number;

    @OneToOne(() => UserWithPassword, user => user.userPreferences)
    @JoinColumn()
    @Field(() => User)
    user: UserWithPassword;
}

@InputType()
export class UserPreferencesInput {

    @Field({ nullable: true })
    practiceGoal?: number;

    @Field({ nullable: true })
    why?: string;

    @Field({ nullable: true })
    codingAbility?: number;

}
