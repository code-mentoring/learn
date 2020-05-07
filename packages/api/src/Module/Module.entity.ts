import { Column, Entity, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { Path } from '../Path/Path.entity';

enum ModuleType {
  assignment = 'assignment',
  lesson = 'lesson'
}

@Entity('module')
@Unique('module_name', ['name'])
export class Module extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column('enum', { name: 'type', enum: ModuleType })
  type: ModuleType;

  @ManyToOne(() => Module, { nullable: true })
  @JoinColumn({ name: 'previous' })
  previous: Module;

  @ManyToOne(() => Path, path => path.module, { nullable: false })
  path: Path;

}
