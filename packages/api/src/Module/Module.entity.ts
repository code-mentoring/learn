import { Column, Entity, PrimaryGeneratedColumn, Unique, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, InputType, registerEnumType } from '@nestjs/graphql';

import { CMBaseEntity } from '../lib/Base.entity';
import { Path } from '../Path/Path.entity';
import { UserModule } from '../UserModule/UserModule.entity';

export enum ModuleType {
  assignment = 'assignment',
  lesson = 'lesson'
}

registerEnumType(ModuleType, { name: 'ModuleType' });

@ObjectType()
@Entity('module')
@Unique('module_name', ['name'])
export class Module extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  icon: string;

  @Column({ type: 'simple-enum', enum: ModuleType })
  @Field()
  type: ModuleType;

  @Column({ nullable: true })
  @Field({ nullable: true })
  previousId?: string;

  @Column()
  @Field()
  pathId: string;

  @ManyToOne(() => Module, { nullable: true })
  @Field(() => Module, { nullable: true })
  previous?: Module;

  @ManyToOne(() => Path, path => path.modules, { nullable: false })
  @Field(() => Path)
  path: Path;

  @OneToMany(() => UserModule, userModules => userModules.module)
  userModules: UserModule[];
}

@InputType()
export class CreateModuleInput {

  @Field()
  name: string;

  @Field()
  icon: string;

  @Field()
  type: ModuleType;

  @Field({ nullable: true })
  previousId?: string;

  @Field()
  pathId: string;
}

@InputType()
export class UpdateModuleInput {

  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field(() => ModuleType, { nullable: true })
  type?: ModuleType;

  @Field({ nullable: true })
  previousId?: string;

  @Field({ nullable: true })
  pathId?: string;
}
