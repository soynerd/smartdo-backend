import express from 'express';
import { db } from '../../config/index.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import {config} from '../../config/index.js';

const router = express.Router();

passport.use(new GoogleStrategy(
  {
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email', 'openid']
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), async (req, res) => {
  const email = req.user.emails[0].value;
  const username = email.replace('@gmail.com', '');
  const name = req.user.displayName.split(' ');
  const profileImage = req.user.photos[0].value;
  const provider = req.user.provider;
  const provider_user_id = req.user.id;

  const fname = name[0];
  const lname = name[1];


  try {
    const existing = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (!existing.rows.length) {
      await db.query(
        `INSERT INTO users (
          username, first_name, last_name, full_name,
          email, profile_image, provider, provider_user_id,
          created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4,
          $5, $6, $7, $8,
          CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        )`,
        [username, fname, lname, name, email, profileImage, provider, provider_user_id]
      );
    }

    const token = jwt.sign({ email, username, fname, profileImage, provider, provider_user_id }, config.jwt.secret, { expiresIn: '7d' });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(config.frontendUrl);

  } catch (error) {
    console.error("Auth :: Google :: error", error);
    res.status(500).send("Internal server error");
  }
});

export default router;

