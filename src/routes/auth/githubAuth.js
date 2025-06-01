import express from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import jwt from 'jsonwebtoken';
import { db, config } from '../../config/index.js';

const router = express.Router();

passport.use(
  new GitHubStrategy(
    {
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

router.get("/github",
    passport.authenticate("github", {
    scope: ["user:email", "profile"],
  })
);

router.get("/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    
    const profile = req.user;
    const username = profile.username;
    const email = username+"@gmail.com"
    const name = profile.displayName ?? '';
    const [fname, lname] = name.split(' ') || ["", ""];
    
    const profileImage = profile.photos[0].value;
    const provider = profile.provider;
    const provider_user_id = profile.id;

    try {
      const existing = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

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
          [
            username,
            fname,
            lname,
            name,
            email,
            profileImage,
            provider,
            provider_user_id,
          ]
        );
      }
      const token = jwt.sign({email, username, fname, profileImage, provider, provider_user_id}, config.jwt.secret, {expiresIn: '7d'});
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.redirect(config.frontendUrl);
    } catch (error) {
      console.error("Auth :: GitHub :: error", error);
      res.status(500).send("Internal server error");
    }
  }
);

export default router;

