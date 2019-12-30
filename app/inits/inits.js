const fs = require('fs');
const path = require('path');
const {
  installNpmPackage,
  deleteFolderRecursive,
  buildStructure
} = require('./../utils/utils');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


function initInfo(option) {
  if(option.backend) {
    console.log(require('./../../libs/architecture-info').be)
    option.backend = false; // otherwise the backend init process is triggered
    return;
  }
  if(option.frontend) {
    console.log("not yet included.")
    option.frontend = false; // otherwise the frontend init process is triggered
    return;
  }
  if(option.bot) {
    console.log(require('./../../libs/architecture-info').bot)
    option.bot = false;
    return;
  }
  if(option.typescriptNode) {
    console.log(require('./../../libs/architecture-info').tn || 'not yet available')
    option.typescriptNode = false;
    return;
  }
  console.log("Please add one of the other options [--bot, --backend, --frontend, --tn] to get a specific info.");
}

function initFe(projectname) {
  try {
    fs.writeFileSync('./package.json', require('./../../libs/frontend/packagejsonFe'))
    installNpmPackage('').then(() => {
      return exec('npm run ngnew '+ projectname + ' --style=scss --routing --skip-git').then(stdout => {
        console.log(stdout.stdout);
        deleteFolderRecursive('./node_modules');
        fs.unlinkSync('./package.json');
        fs.unlinkSync('./package-lock.json');
        if (!fs.existsSync(`./${projectname}/src/app/services`)) fs.mkdirSync(`./${projectname}/src/app/services`);
        if (!fs.existsSync(`./${projectname}/src/app/components`)) fs.mkdirSync(`./${projectname}/src/app/components`);
        if (!fs.existsSync(`./${projectname}/src/app/components/general`)) fs.mkdirSync(`./${projectname}/src/app/components/general`);
        if (!fs.existsSync(`./${projectname}/src/app/views`)) fs.mkdirSync(`./${projectname}/src/app/views`);

        fs.writeFileSync(`./${projectname}/src/environments/environments.ts`, require('./../../libs/frontend/angular-environments'));

        fs.readdirSync(`./${projectname}`).forEach( f => {
          console.log("file: ", f)
          fs.copyFileSync(path.join(dir, f), path.join('./', f), COPYFILE_EXCL);
        })
      });
    }).catch(error => console.error);
  } catch(e) {
    console.error('/bin/sh: ng: command not found. Please install ng globally first.');
  }
}

function initBe(projectname) {
  buildStructure(__dirname +'/../../libs/backend/basic', './'+projectname , [projectname]);
  console.log("Backend Structure created")
  installNpmPackage('', projectname);
}

function initBot(projectname) {
  buildStructure(__dirname +'/../../libs/bot/basic', './'+projectname , [projectname]);
  console.log('Bot structure created.')
  installNpmPackage('');
}

function initTypescriptNode(projectname) {
  buildStructure(__dirname +'/../../libs/backend/typescript-node', './'+projectname , [projectname]);
  console.log('NodeJs + Typescript project has been initialized.');
  installNpmPackage('', projectname);
}

module.exports = {
  initInfo,
  initFe,
  initBe,
  initBot,
  initTypescriptNode
}
