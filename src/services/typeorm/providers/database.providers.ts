import { DataSource } from 'typeorm';
import { Users } from '../../../modules/entities';
import Env from '../../../config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mongodb',
        host: Env().database_host,
        port: Env().database_port,
        database: Env().database_name,
        username: Env().database_username,
        password: Env().database_password,
        authSource: Env().database_authsource,
        entities: [Users],
        replicaSet: Env().database_replica_set ? 'my-replica-set' : undefined,
        synchronize: true,
        useUnifiedTopology: true,
      });

      return dataSource.initialize();
    },
  },
];
