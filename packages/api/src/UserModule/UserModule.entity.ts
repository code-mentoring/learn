import { Field, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, Unique, ManyToOne } from 'typeorm';
import { CMBaseEntity } from '../lib/Base.entity';
import { UserWithPassword } from '../User/User.entity';
import { Module } from '../Module/Module.entity';

@ObjectType()
@Entity()
@Unique(['userId', 'moduleId'])
export class UserModule extends CMBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    userId: string;

    @Column()
    @Field()
    moduleId: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    completedAt?: Date;

    @ManyToOne(() => UserWithPassword, user => user.userModules)
    user: UserWithPassword;

    @ManyToOne(() => Module, module => module.userModules)
    module: Module;
}
