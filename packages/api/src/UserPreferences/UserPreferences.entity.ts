import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';

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
