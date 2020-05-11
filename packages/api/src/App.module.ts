import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';

import { AuthModule } from './Auth';
import { DatabaseModule } from './Database';
import { UserModule } from './User';
import { PathModule } from './Path';
import { PathUserModule } from './PathUser';
import { AssignmentModule } from './Assignment';
import { AssignmentFileModule } from './AssignmentFile';
import { ModuleModule } from './Module';

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
  ModuleModule,

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
