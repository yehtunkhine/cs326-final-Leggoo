import passport from 'passport';
import passportLocal from 'passport-local';
import { KajaDatabase } from './kaja-db.js';


const { Strategy } = passportLocal;

const strategy = new Strategy(async (email, password, done) => {
  if (!KajaDatabase.findUser(email)) {
    // no such email
    return done(null, false, { message: 'Wrong email' });
  }
  if (!KajaDatabase.validatePassword(email, password)) {
    // invalid password
    // should disable logins after N messages
    // delay return to rate-limit brute-force attacks
    await new Promise((r) => setTimeout(r, 2000)); // two second delay
    return done(null, false, { message: 'Wrong password' });
  }
  // success!
  // should create a user object here, associated with a unique identifier
  return done(null, email);
});

passport.use(strategy);

// Convert user object to a unique identifier.
passport.serializeUser((email, done) => {
  done(null, email);
});

// Convert a unique identifier to a user object.
passport.deserializeUser((eid, done) => {
  done(null, eid);
});

export default {
  configure: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
  },

  authenticate: (domain, where) => {
    return passport.authenticate(domain, where);
  },
};
