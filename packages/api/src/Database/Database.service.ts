import { Inject, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import config from 'config';

@Injectable()
export class DatabaseService {
  /**
   * Initializes the database service
   * @param connection The connection, which gets injected
   */
  constructor(@Inject('Connection') public connection: Connection) { }

  /**
   * Returns the repository of the given entity
   * @param entity The database entity to get the repository from
   */
  async getRepository<T>(entity: string): Promise<Repository<T>> {
    return this.connection.getRepository(entity);
  }

  /**
   * Loops over all tables and removes everything!
   * BE CAREFUL
   * Used in testing
   */
  async DANGEROUSLY_RESET_DATABASE() {
    if (config.get('db.type') === 'sqlite') {
      await this.connection.dropDatabase();
      await this.connection.synchronize(true);
    } else {
      await Promise.all(this.connection.entityMetadatas.map(async entity => {
        const repository = await this.getRepository(entity.name);
        await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE`);
      }));
    }
  }
}
