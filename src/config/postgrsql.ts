// import { Pool } from 'pg';
// import { env, isProd } from './appConfig';

// export const pgPool = new Pool({
//   host: env.DB_POSTGRESQL_HOST,
//   database: env.DB_POSTGRESQL_NAME,
//   password: env.DB_POSTGRESQL_PASSWORD,
//   user: 'postgres',
//   port: isProd ? 5432 : 1234, // 1234 only for local proxy_POSTGRESQL_HOST,
//   max: 5,
//   idleTimeoutMillis: 8000,
// });

// export const checkConnection = async () => {
//   try {
//     await pgPool.query('SELECT 1');
//     console.log('Connection to PostgreSQL established');
//   } catch (error) {
//     console.error('Error connecting to PostgreSQL:', error);
//   } 
//   // finally {
//     // await pgPool.end();
//   // }
// };
