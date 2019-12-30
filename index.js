#!/usr/bin/env node
// line above is very important! DO NOT REMOVE!
const program = require('commander');
const fs = require('fs');
const {
  initInfo,
  initBe,
  initBot,
  initTypescriptNode } = require('./app/inits/inits');

const {
  addServiceElastic,
  addServiceMailer,
  addServiceNgBackend
} = require('./app/services/services');
const userAuth = require('./app/services/userAuth');

program
  .version('0.2.1', '-v, --version')

program
    .command('init <name>')
    .description('init a project setup')
    .option('-b, --backend', 'init backend for a project')
    .option('--bot', 'init of a bot project')
    .option('--tn, --typescriptNode', 'init node backend with typescript')
    .option('--info', 'provides info')
    .action(function(name, cmd) {
      if(cmd.info) {
        initInfo(cmd)
      } else {
        initProject(name, cmd)
      }
    });

program
    .command('addTemplate <name>')
    .description('adds a new template')
    .action((name, cmd) => {
      addTemplate(name)
    })

program
    .command('addSkill <name>')
    .description('adds a new skill to customHandlers - untested module')
    .option('-m --middleware', 'adds Test going through middleware')
    .option('--noTest', 'not adding a test for the handler')
    .action((name, cmd) => {
      addSkill(name, cmd)
    })

program
    .command('addService')
    .description(`can add Services for following types:`)
    // .option('-w, --watson', 'Add watson Service - not yet included')
    // .option('-a, --alexa', 'Add alexa Service - not yet included')
    // .option('-d, --dialogflow', 'Add dialogflow Service - not yet included')
    .option('-e, --elasticsearch', 'Add elasticsearch Service')
    .option('--mailer', 'Add mailer Service based on nodemailer')
    .option('--ngB --ngBackendService', 'Add backend service for angular projects')
    .option('--userAuth', 'Add user authentification on routes with mongoose')
    .action((cmd) => {
      addService(cmd)
    })

program
    .command('addReadme')
    .description(`adds pre written readme`)
    .action((cmd) => {
      addReadme(cmd);
    })

program
    .command('addUtils')
    .description(`adds utils`)
    .option('--customError, --cError', 'Add customError class')
    .option('--fp, --functionalProgramming', 'Adds utils for functional programming.')
    .action((cmd) => {
      addUtils(cmd);
    })

program.parse(process.argv);


function addReadme() {
  fs.writeFileSync('./Readme.md', require('./libs/readme'))
  console.log("Readme added.")
}

function initProject(projectName, cmd){
  if(cmd.backend) initBe(projectName);
  if(cmd.bot) initBot(projectName);
  if(cmd.tn || cmd.typescriptNode) initTypescriptNode(projectName);
  if(!cmd.bot && !cmd.backend
     && !(cmd.tn || cmd.typescriptNode)) console.log("Please choose one of the options  \n'-b, --backend', 'init backend for a project'\n'-f, --frontend', 'init frontend for a project - not yet included'\n'--bot', 'init of a bot project'")
  if(!projectName) console.log("Please set a project name.")
}

function addTemplate(templateName) {
  if (templateName && typeof(templateName) === 'string') {
    if (!fs.existsSync('./templates')) {
      fs.mkdirSync('./templates')
      fs.writeFileSync('./templates/templates.js', 'module.export={\n};')
    }
    fs.writeFileSync(`./templates/${templateName.trim()}.template.js`, require('./libs/bot/template')(templateName.trim()));
    let templates = fs.readFileSync(`./templates/templates.js`, "utf8");
    const index = templates.indexOf('};');
    const str = `${index > 16?"," :""}\n\t${templateName.trim()}:require('./templates/${templateName.trim()}.template.js')`;
    templates = templates.slice(0, index-1) + str + templates.slice(index-1);
    fs.writeFileSync('./templates/templates.js', templates)
    console.log(`Template ${templateName} has been added.`);
  } else {
    console.log("You can not add a template without a name.")
  }
}

function addService(cmd) {
  if(cmd.watson) console.log("watson  - not yet included")
  if(cmd.dialogflow) console.log("DF - not yet included")
  if(cmd.alexa) console.log("alexa - not yet included")
  if(cmd.elasticsearch) addServiceElastic();
  if(cmd.mailer) addServiceMailer();
  if(cmd.ngBackendService) addServiceNgBackend();
  if(cmd.userAuth) userAuth();
  if(!cmd.watson && !cmd.dialogflow &&
     !cmd.alexa && !cmd.elasticsearch &&
     !cmd.mailer && !cmd.ngBackendService &&
     !cmd.userAuth) {
    console.log("use an option")
  }
}


function addSkill(skillname, cmd) {
  if (!fs.existsSync('./customHandlers')) fs.mkdirSync('./customHandlers');
  if (!fs.existsSync('./tests')) fs.mkdirSync('./tests');
  if (fs.existsSync(`./customHandlers/${skillname}.handler.js`)) return console.error("File already exists.");

  if (cmd.middleware) {
    fs.writeFileSync(`./tests/${skillname}.handler.test.js`, require('./libs/bot/newSkillHandlerTestWithMiddleware')(skillname));
  } else if (!cmd.noTest){
    fs.writeFileSync(`./tests/${skillname}.handler.test.js`, require('./libs/bot/newSkillHandlerTest')(skillname));
  }
  fs.writeFileSync(`./customHandlers/${skillname}.handler.js`, require('./libs/bot/newSkillHandler')(skillname));
  return console.log(`Custom Skill Handler ${skillname} has been added.`);
}

function addUtils(cmd) {
  if(cmd.customError || cmd.cError) {
    if (!fs.existsSync('./utils')) fs.mkdirSync('./utils');
    fs.writeFileSync(`./utils/customError.js`, require('./libs/utils/utils-cError.js'));
    console.log("customError class has been added to ./utils");
  } else if( cmd.fp || cmd.functionalProgramming) {
    if (!fs.existsSync('./utils')) fs.mkdirSync('./utils');
    fs.writeFileSync(`./utils/utils-fp.js`, require('./libs/utils/utils-fp.js'));
    console.log("Functional programming utils has been added to ./utils");
  }
}


