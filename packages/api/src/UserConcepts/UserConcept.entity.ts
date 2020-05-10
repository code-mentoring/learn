import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Unique} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Concept } from '../Concepts/Concept.entity';
import { CMBaseEntity } from '../lib/Base.entity';

@ObjectType()
@Entity()
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

    @ManyToOne(() => Concept, concept => concept.userConcept)
    concept: Concept;

}