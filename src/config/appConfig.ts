import dotenv from 'dotenv';
import * as yup from 'yup';
dotenv.config();

const envSchema = yup
  .object({
    NODE_ENV: yup.string().default('development'),
    PORT: yup.number().default(3000),
    GOOGLE_KEYFILE_PATH: yup.string().notRequired(),

    // //  POSTGRESQL
    // DB_POSTGRESQL_NAME: yup.string().required().label('DB_POSTGRESQL_NAME'),
    // DB_POSTGRESQL_PASSWORD: yup.string().required().label('DB_POSTGRESQL_PASSWORD'),
    // DB_POSTGRESQL_HOST: yup.string().required().label('DB_POSTGRESQL_HOST'),

    // // Redis (optional – for cache; Memorystore or local)
    // REDIS_HOST: yup.string().required().label('REDIS_HOST'),
    // REDIS_PORT: yup.number().optional().default(6379).label('REDIS_PORT'),

    // // Auth
    // JWT_SECRET: yup.string().required().label('JWT_SECRET'),
    // JWT_ACCESS_EXPIRY: yup.string().default('15m'),
    // JWT_REFRESH_EXPIRY: yup.string().default('7d'),
  })
  .required();

export type ValidatedEnv = yup.InferType<typeof envSchema>;

const env = envSchema.validateSync(process.env) as ValidatedEnv;

export { env };

export const isProd = env.NODE_ENV === 'production';
export const showLogsOnlyInProd = false;
export const CRITICAL_ERROR = 'criticalError';
export const GOOGLE_CLOUD_PROJECT = 'crafty-shelter-403405';
