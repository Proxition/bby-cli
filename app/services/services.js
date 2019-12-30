const fs = require('fs')
const {
  installNpmPackage,
  extendFile
} = require('./../utils/utils')

function addServiceNgBackend() {
  if (!fs.existsSync('./src/app/services')) fs.mkdirSync('./src/app/services')
  fs.writeFileSync('./src/app/services/backendservice.service.ts', require('./../../libs/frontend/service-backendservice-angular'))
  fs.writeFileSync('./src/app/services/backendservice.service.ts', require('./../../libs/frontend/service-backendservice-angular'))
  console.log("angular service backend has been created")
}

function addServiceElastic() {
  if (!fs.existsSync('./services')) fs.mkdirSync('./services');
  installNpmPackage('elasticsearch')
  fs.writeFileSync('./services/elasticservice.js', require('./../../libs/service-elasticsearch').elasticService)
  extendFile('./', '.env', require('./../../libs/service-elasticsearch').dotenvExtension)

  if(!fs.existsSync('Docker')) {
    fs.writeFileSync('./Docker', require('./../../libs/backend/docker').docker)
  }
  if(!fs.existsSync('docker-compose')) {
    fs.writeFileSync('./docker-compose', require('./../../libs/backend/docker').dockerCompose)
  }

  console.log("service elastic has been created")
}

function addServiceMailer() {
  if (!fs.existsSync('./services')) fs.mkdirSync('./services');
  installNpmPackage('nodemailer')
  fs.writeFileSync('./services/mailerservice.js', require('./../../libs/backend/service-mailer').mailer)
  extendFile('./', '.env', require('./../../libs/backend/service-mailer').dotenvExtension)
  console.log("service mailer has been created")
}

module.exports = {
  addServiceElastic,
  addServiceMailer,
  addServiceNgBackend
}
