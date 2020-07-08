import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, Unique, PrimaryGeneratedColumn } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { Path } from '../Path/Path.entity';
import { UserWithPassword } from '../User/User.entity';


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

    @ManyToOne(() => Path)
    @JoinColumn({ name: 'name' })
    @Field()
    path: Path;

    @CreateDateColumn()
    @Field({ nullable: true })
    completedAt?: Date;

    @ManyToOne(() => UserWithPassword, user => user.userModules)
    user: UserWithPassword;
}
