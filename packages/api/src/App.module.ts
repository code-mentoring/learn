import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';

import { AssignmentModule } from './Assignment';
import { AssignmentFileModule } from './AssignmentFile';
import { AuthModule } from './Auth';
import { CharacterModule } from './Character';
import { ConceptModule } from './Concept';
import { DatabaseModule } from './Database';
import { FriendModule } from './Friend';
import { ModuleModule } from './Module';
import { PathModule } from './Path';
import { PathUserModule } from './PathUser';
import { UserModule } from './User';
import { UserConceptModule } from './UserConcepts';
import { UserModuleModule } from './UserModule';

/**
 * Export these dependencies so they can be used in testing
 */
export const appImports = [
  AuthModule,
  UserModule,
  PathModule,
  PathUserModule,
  AssignmentModule,
  AssignmentFileModule,
  FriendModule,
  ModuleModule,
  CharacterModule,
  ConceptModule,
  UserConceptModule,
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
