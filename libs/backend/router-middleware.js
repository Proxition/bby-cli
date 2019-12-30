const middleware = `
const passport = require("passport");
const passportJWT = require("passport-jwt");
const mongoose = require('mongoose');

const User = require('./../models/user');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

mongoose.Promise = Promise;

mongoose.connect(process.env.DB_URL, {useMongoClient: true});

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {

  User.findById(jwt_payload._id, function(error, user) {
    if (!error && user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });

});

passport.use(strategy);

const middleware = {
    isAuthenticated(req, res, next) {
        // if route is in Regex - do not check for credentials
        if(req.path.match(/(^\\/auth\\/login|^\\/assets\\/)/) === null) {
          passport.authenticate('jwt', {session: false})(req, res, next);
        } else {
          next();
        }
    },

    // user is authenticate -> checkGroup
    checkGroup(req, res, next) {
      if(!req.user || req.user.group === 'admin' || (req.path === '/api/' + req.user)) {
        next();
      } else {
        res.status(401).json({message: 'you are not allowed here'})
      }
    }
}

module.exports = middleware;
`;

const packages = ["passport", "passport-jwt", 'mongoose', 'bcrypt-node'];

const dotenvExtension = `
JWT_SECRET=

#MongoDB
DB_URL=
`

// path: ./../models/user
const mongooseUserModel = `
const mongoose = require('mongoose');

const bcrypt = require('bcrypt-node');

mongoose.Promise = Promise;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: ObjectId,
    group: {type: String, default: ''},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.pre('save', function(callback) {
  const user = this

  if (!user.isModified('password')) return callback()

  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, null, function(error, hash) {
          user.password = hash;
          callback()
      })
  })
})

userSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(error, isMatch) {
    if (error) return callback(error)
    callback(null, isMatch)
  })
}

const User = mongoose.model('User', userSchema);
module.exports = User;
`

const appInsertionAfter = {
  filepath: './',
  filename: 'app.js',
  insertion: `
// be careful with this option - it will break some routes that rely on the user object
if (process.env.AUTH_DISABLE !== 'true') {
  app.use(require('./modules/middleware').isAuthenticated);
  app.use(require('./modules/middleware').checkGroup);
}
`,
  after: `app.use(bodyParser.json())`
}


module.exports = {
  middleware,
  mongooseUserModel,
  dotenvExtension,
  packages,
  appInsertionAfter
}
