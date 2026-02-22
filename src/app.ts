import express from 'express';
import {  env } from './config/appConfig';


/** Records request start time and adds timing to response (header + body for JSON objects). */
function requestTimingMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const start = Date.now();
  (req as express.Request & { _startTime?: number })._startTime = start;

  const setTimingHeaders = () => {
    const durationMs = Date.now() - start;
    res.setHeader('X-Response-Time-Ms', String(durationMs));
    res.setHeader('X-Request-Start', new Date(start).toISOString());
    return durationMs;
  };

  const originalJson = res.json.bind(res);
  res.json = function (body: unknown): express.Response {
    const durationMs = setTimingHeaders();
    if (body !== null && typeof body === 'object' && !Array.isArray(body) && !(body instanceof Buffer)) {
      return originalJson({ res:{...(body as Record<string, unknown>)}, _meta: { requestDurationMs: durationMs, requestStart: new Date(start).toISOString() } });
    }
    return originalJson(body);
  };

  const originalSend = res.send.bind(res);
  res.send = function (body?: unknown): express.Response {
    setTimingHeaders();
    return originalSend(body);
  };

  next();
}

const app = express();
app.use(express.json());
app.use(requestTimingMiddleware);

app.get('/', (req, res) => {
  console.log('Hello World at ' + new Date().toISOString());
  res.status(200).json({ message: `Node environment: ${env.NODE_ENV} at ${new Date().toISOString()}` });
});


// Final error handler: send 500 and log
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = err instanceof Error ? err.message : 'Internal server error';
  console.error('Unhandled error', { err });
  res.status(500).json({ error: message });
});

export { app };
