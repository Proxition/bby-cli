const fs = require('fs')
const {
  installNpmPackage,
  insertInFileAfter,
  extendFile
} = require('./../utils/utils')

const {
  middleware,
  mongooseUserModel,
  dotenvExtension,
  packages,
  appInsertionAfter
} = require('./../../libs/backend/router-middleware');

// ./../models/user
function addUserAuth() {
  if (!fs.existsSync('./modules')) fs.mkdirSync('./modules');
  if (!fs.existsSync('./models')) fs.mkdirSync('./models');
  installNpmPackage(packages.join(' '));

  fs.writeFileSync('./modules/middleware.js', middleware);
  fs.writeFileSync('./models/user.js', mongooseUserModel);
  insertInFileAfter(appInsertionAfter.filepath, appInsertionAfter.filename, appInsertionAfter.insertion, appInsertionAfter.after)

  extendFile('./', '.env', dotenvExtension)
  console.log("user authentification on routes has been created")
}


module.exports = addUserAuth;
