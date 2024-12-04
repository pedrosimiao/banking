// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://fe790bc5719e1147a9eb1e8f60fef61c@o4508407810621440.ingest.us.sentry.io/4508407812063232",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  integrations: [
    Sentry.replayIntegration(),
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, 
  // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, 
  // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
