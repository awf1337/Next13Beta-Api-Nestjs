export default () => ({
  port: parseInt(process.env.PORT || '4000'),
  database_port: parseInt(process.env.DATABASE_PORT || '30002'),
  database_host: process.env.DATABASE_HOST,
  database_name: process.env.DATABASE_NAME,
  database_replica_set: process.env.DATABASE_REPLICA_SET === 'true',
  database_username: process.env.DATABASE_USERNAME,
  database_password: process.env.DATABASE_PASSWORD,
  database_authsource: process.env.DATABASE_AUTHSOURCE,
  node_env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
});
