import type { INestApplication } from '@nestjs/common';
import compression from 'compression';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';

export function middleware(app: INestApplication): INestApplication {
  const isProduction = process.env.NODE_ENV === 'production';

  // compress HTTP responses to improve performance
  app.use(compression());
  // session management (used to store session data like user authentication).
  app.use(
    session({
      // Requires 'store' setup for production
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: isProduction },
    }),
  );
  // handle authentication
  app.use(passport.initialize());
  app.use(passport.session());
  // add security headers to the HTTP responses
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginEmbedderPolicy: isProduction ? undefined : false,
    }),
  );

  return app;
}
