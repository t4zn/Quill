import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';
import User, { IUser } from '../models/User';

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user || undefined);
  } catch (error) {
    done(error, undefined);
  }
});

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: any) => {
    try {
      // Check if user already exists with this Google ID
      let user = await User.findOne({ 
        $or: [
          { googleId: profile.id },
          { email: profile.emails?.[0]?.value }
        ]
      });

      if (user) {
        // Update Google ID if not set
        if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }
        return done(null, user);
      }

      // Create new user
      user = new User({
        googleId: profile.id,
        username: profile.username || profile.displayName?.replace(/\s+/g, '').toLowerCase() || `user_${profile.id}`,
        email: profile.emails?.[0]?.value,
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        avatar: profile.photos?.[0]?.value,
        isVerified: true
      });

      await user.save();
      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  }));
}

// GitHub OAuth Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback"
  },
  async (accessToken: string, refreshToken: string, profile: GitHubProfile, done: any) => {
    try {
      // Check if user already exists with this GitHub ID
      let user = await User.findOne({ 
        $or: [
          { githubId: profile.id },
          { email: profile.emails?.[0]?.value }
        ]
      });

      if (user) {
        // Update GitHub ID if not set
        if (!user.githubId) {
          user.githubId = profile.id;
          await user.save();
        }
        return done(null, user);
      }

      // Create new user
      user = new User({
        githubId: profile.id,
        username: profile.username || `user_${profile.id}`,
        email: profile.emails?.[0]?.value,
        firstName: profile.displayName?.split(' ')[0],
        lastName: profile.displayName?.split(' ').slice(1).join(' '),
        avatar: profile.photos?.[0]?.value,
        isVerified: true
      });

      await user.save();
      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  }));
}

export default passport;