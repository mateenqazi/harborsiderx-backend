import bcrypt from 'bcryptjs';
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oauth20'
import passport from 'passport';
import APP_CONFIG from '../constants/AppConfig';
import { EMAIL_MISMATCH_ERROR, PASSWORD_INCORRECT_ERROR } from '../constants';
import { UserRepository } from '../modules/users/user.repository';

passport.use(
  new LocalStrategy.Strategy(
    {
      passReqToCallback: true,
      usernameField: 'email',
    },
    async (req, email, password, done) => {
      const userRepository = new UserRepository();
      const user = await userRepository.getUser(email);
      if (!user) {
        done(EMAIL_MISMATCH_ERROR)
      }
      if (user) {
        bcrypt.compare(password, user.password!, (_: any, isMatch: any) => {
          if (isMatch) {
            done(null, user);
          } else {
            done(PASSWORD_INCORRECT_ERROR);
          }
        });
      }
    },
  ),
);
passport.use(
  new GoogleStrategy.Strategy({
    clientID: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    callbackURL: `${process.env.HOST}/api/auth/google/callback`,
    passReqToCallback: true,
  },
  (async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
    const userRepository = new UserRepository();
    /* eslint no-underscore-dangle: 0 */
    const user = await userRepository.getUser(profile._json.email || '');
    if (user) {
      done(null, user)
    }
    if (!user) {
      const authUser = await userRepository.createUser({
        /* eslint no-underscore-dangle: 0 */
        email: profile._json.email,
        type: 'google',
      })
      done(null, authUser)
    }
  })),
)

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser(async (user: any, done: any) => {
  done(null, user);
});