import * as Sentry from "@sentry/react-router";
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: "https://0ee313f40d2b4f7399ac6dda194001bf@o4509583780282368.ingest.de.sentry.io/4509583786180688",
  
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Enable logs to be sent to Sentry
  _experiments: { enableLogs: true },
  
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  profilesSampleRate: 1.0, // profile every transaction
});
