import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { Path } from '../Path/Path.entity';
import { UserWithPassword } from '../User/User.entity';


@Entity('pathUser')
@Unique(['userId', 'pathId'])
export class PathUser extends CMBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    pathId: string;

    @Column()
    userId: string;

    @Column({ default: false })
    completed: boolean;

    @Column({ default: 0 })
    progress: number;

    @CreateDateColumn()
    joined: Date;

    @ManyToOne(() => Path, path => path.pathUser)
    path: Path;

    @ManyToOne(() => UserWithPassword, user => user.pathUser)
    user: UserWithPassword;
}
