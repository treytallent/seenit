// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://6a1c397d87c819baf376d823c79c9f51@o4511799338532864.ingest.de.sentry.io/4511804720021584',
  tracesSampleRate: 1,
  enableLogs: true,
})
