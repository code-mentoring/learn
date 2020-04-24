import { Entity, Column, ManyToOne, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, ID } from "@nestjs/graphql";

import { Path } from "../Path/Path.entity";
import { UserWithPassword } from "../User/User.entity";

@ObjectType()
export class EPathUser {
    @Field(() =>ID)
    id: string;

    @Field()
    pathId: string;

    @Field()
    userId: string;

    @Field()
    completed: boolean;
}

@Entity()
export class PathUser extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    public pathId!: string;

    @Column()
    public userId!: string;

    @Column({type: 'boolean',  default: false})
    public completed: boolean;

    @ManyToOne(() => Path, path => path.pathUser)
    public path!: Path;

    @ManyToOne(() => UserWithPassword, user => user.pathUser)
    public user!: UserWithPassword;
}
