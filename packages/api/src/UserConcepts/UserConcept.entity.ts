import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Unique } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Concept } from '../Concept/Concept.entity';
import { CMBaseEntity } from '../lib/Base.entity';
import { UserWithPassword, User } from '../User/User.entity';

@ObjectType()
@Entity('userConcept')
@Unique(['userId', 'conceptId'])
export class UserConcept extends CMBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    userId: string;

    @Column()
    @Field()
    conceptId: string;

    @CreateDateColumn()
    @Field()
    learned: Date;

    @ManyToOne(() => Concept)
    @Field(() => Concept)
    concept: Concept;

    @ManyToOne(() => UserWithPassword)
    @Field(() => User)
    user: UserWithPassword;
}
