import { env } from './config/appConfig';
import { app } from './app';


process.on('uncaughtException', (err) => {
  console.error('Uncaught exception', { err });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  const err = reason instanceof Error ? reason : new Error(String(reason));
  console.error('Unhandled rejection', { err, promise });
});

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});
