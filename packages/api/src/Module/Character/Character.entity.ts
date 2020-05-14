import { Column, Entity, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { CMBaseEntity } from '../../lib/Base.entity';
import { Path } from '../../Path/Path.entity';

@ObjectType()
export class Character extends CMBaseEntity {

    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    displayName: string;
}

@Entity('character')
@Unique('character_name', ['name'])
export class ECharacter extends CMBaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  displayName: string;

  @ManyToOne(() => ECharacter, { nullable: true })
  @JoinColumn({ name: 'previous' })
  previous: ECharacter;

  @ManyToOne(() => Path, path => path.character, { nullable: false })
  path: Path;

}

@InputType()
export class CharacterInput {

    @Field()
    name: string;

    @Field()
    displayName: string;

    @Field({ nullable: true })
    previous?: string;

    @Field()
    path: string;
}
