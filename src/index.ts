import { env } from './config/appConfig';
import { app } from './app';
import { initializeSubscribers } from './events/subscriber';

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception', { err });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  const err = reason instanceof Error ? reason : new Error(String(reason));
  console.error('Unhandled rejection', { err, promise });
});

async function main() {
  try {
    await initializeSubscribers();
    
    app.listen(env.PORT, () => {
      console.log(`Orders service listening on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start Orders service', { error });
    process.exit(1);
  }
}

main();
// test 2