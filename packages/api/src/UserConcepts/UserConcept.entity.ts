import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Concept } from '../Concepts/Concept.entity';

@ObjectType()
@Entity()
export class UserConcept {
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