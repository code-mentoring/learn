import { Column, Entity, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

import { CMBaseEntity } from '../lib/Base.entity';
import { Path } from '../Path/Path.entity';


export enum ModuleType {
  assignment = 'assignment',
  lesson = 'lesson'
}

@ObjectType()
export class Module extends CMBaseEntity {

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  icon: string;

  @Field()
  type: ModuleType;

  @Field(() => Module, { nullable: true })
  previous?: Module;

  @Field(() => Path)
  path: Path;
}

@Entity('module')
@Unique('module_name', ['name'])
export class EModule extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column('enum', { name: 'type', enum: ModuleType })
  type: ModuleType;

  @ManyToOne(() => EModule, { nullable: true })
  @JoinColumn({ name: 'previous' })
  previous: EModule;

  @ManyToOne(() => Path, path => path.module, { nullable: false })
  path: Path;

}

@InputType()
export class ModuleInput {

  @Field()
  name: string;

  @Field()
  icon: string;

  @Field()
  type: ModuleType;

  @Field({ nullable: true })
  previous?: string;

  @Field()
  path: string;
}
