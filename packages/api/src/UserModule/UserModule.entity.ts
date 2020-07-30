import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { CMBaseEntity } from '../lib/Base.entity';
import { Path } from '../Path/Path.entity';
import { UserWithPassword } from '../User/User.entity';


// TODO: Remove graphql here. It should be DB only

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

    @Column({ nullable: true })
    @Field({ nullable: true })
    completedAt?: Date;

    @ManyToOne(() => UserWithPassword, user => user.userModules)
    user: UserWithPassword;

    /**
     * Every time the user requests a lesson, this secret will get updated.
     * The secret is sent to the client, so when the answer is submitted,
     * it's encrypted with this key. This means when answers are sent (and decrypted
     * by the API), nobody can inspect and cheat. It's also locked down to the user
     */
    @Column()
    secret: string;

    @Column({ default: 1 })
    viewed: number;
}
