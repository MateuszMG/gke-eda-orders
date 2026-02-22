import dotenv from 'dotenv';
import * as yup from 'yup';
dotenv.config();

const envSchema = yup
  .object({
    NODE_ENV: yup.string().default('development'),
    PORT: yup.number().default(3000),
    GOOGLE_KEYFILE_PATH: yup.string().notRequired(),
    GCP_PROJECT_ID: yup.string().default('crafty-shelter-403405'),
  })
  .required();

export type ValidatedEnv = yup.InferType<typeof envSchema>;

const env = envSchema.validateSync(process.env) as ValidatedEnv;

export { env };

export const isProd = env.NODE_ENV === 'production';
export const showLogsOnlyInProd = false;
export const CRITICAL_ERROR = 'criticalError';
export const GOOGLE_CLOUD_PROJECT = env.GCP_PROJECT_ID;
