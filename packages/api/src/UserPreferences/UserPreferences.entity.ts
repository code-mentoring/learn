import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsInt, Min, Max } from 'class-validator';

@ObjectType()
@Entity()
@Unique(['userId'])
export class UserPreferences extends BaseEntity {
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
    @Min(1)
    @Max(10)
    codingAbility: number;

}

@InputType()
export class UserPreferencesInput {

    @Field()
    practiceGoal: number;

    @Field()
    why: string;

    @Field()
    codingAbility: number;

}
