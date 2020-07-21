import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';

import { AssignmentFileModule } from './AssignmentFile';
import { AssignmentModule } from './Assignment';
import { AuthModule } from './Auth';
import { CharacterModule } from './Character';
import { CMSModule } from './CMS';
import { ConceptModule } from './Concept';
import { DatabaseModule } from './Database';
import { FriendModule } from './Friend';
import { LessonModule } from './Lesson';
import { ModuleModule } from './Module';
import { PathModule } from './Path';
import { PathUserModule } from './PathUser';
import { QuestionModule } from './Question';
import { StorySectionModule } from './StorySection';
import { UserConceptModule } from './UserConcepts';
import { UserModule } from './User';
import { UserModuleModule } from './UserModule';

/**
 * Export these dependencies so they can be used in testing
 */
export const appImports = [
  CMSModule,

  AssignmentFileModule,
  AssignmentModule,
  AuthModule,
  CharacterModule,
  ConceptModule,
  FriendModule,
  LessonModule,
  ModuleModule,
  PathModule,
  PathUserModule,
  QuestionModule,
  StorySectionModule,
  UserConceptModule,
  UserModule,
  UserModuleModule,

  DatabaseModule,

  GraphQLModule.forRoot({
    installSubscriptionHandlers: true,
    autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
    context: ({ req }) => ({ req })
  })
];

/**
 * Main App module for NestJS
 */
@Module({
  imports: appImports
})
export class AppModule {}
