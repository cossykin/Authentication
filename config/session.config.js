// import session from 'express-session';
// import Redis from 'redisio';
// import connectRedis from 'connect-redis';

// const RedisStore = connectRedis(session);

// const redisClient = new Redis({
//   host: '127.0.0.1',
//   port: 6379,
//   legacyMode: true,
// });

// redisClient.connect().catch(console.error);

// const sessionMiddleware = session({
//   store: new RedisStore({ client: redisClient }),
//   secret: process.env.SESSION_SECRET || 'supersecretkey',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // set to true if using HTTPS
//     httpOnly: true,
//     maxAge: 1000 * 60 * 30, // 30 minutes
//   },
// });

// export default sessionMiddleware;

import session from 'express-session';
import Redis from 'redis';
// import connectRedis from 'connect-redis';

// const RedisStore = connectRedis(session);
import { RedisStore } from 'connect-redis';

// Create Redis client
const redisClient = Redis.createClient({
  legacyMode: true, // needed for some redis versions
  url: 'redis://localhost:6379', // your Redis URL
});

redisClient.connect().catch(console.error);

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day session expiry
  },
});

export default sessionMiddleware;
