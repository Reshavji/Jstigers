const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user'); // Assuming User model is exported from the 'user' module
const { clientId, clientSecret } = require('../config/googleData');

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: "1019545760260-7aj5uabpa4m056fboa9qtgc2eeo3csmu.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:9000/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // find if a user exists with this email or not
      const existingUser = await User.findOne({ email: profile.emails[0].value });

      if (existingUser) {
        // user exists
        // update data if needed (skipping for now)
        return done(null, existingUser);
      } else {
        // create a new user
        const newUser = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          password: null,
          provider: 'google',
          isVerified: true,
        });

        // save the new user to the database
        const savedUser = await newUser.save();

        if (savedUser) {
          return done(null, savedUser);
        } else {
          // Handle error during user creation
          return done(new Error('Error creating user'));
        }
      }
    } catch (error) {
      // Handle any unexpected errors
      return done(error);
    }
  }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
