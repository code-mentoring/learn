import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Path } from '../Path/Path.entity';
import { UserWithPassword } from '../User/User.entity';

@ObjectType()
@Entity()
@Unique(['userId', 'pathId'])
export class PathUser extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column()
    @Field()
    pathId: string;

    @Column()
    @Field()
    userId: string;

    @Column({ default: false })
    @Field()
    completed: boolean;

    @CreateDateColumn()
    joined: Date;

    @ManyToOne(() => Path, path => path.pathUser)
     path: Path;

    @ManyToOne(() => UserWithPassword, user => user.pathUser)
     user: UserWithPassword;
}
