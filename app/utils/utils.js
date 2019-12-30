const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);

async function installNpmPackage(packagename, path) {
  console.log(`Installing npm ${packagename?'package ' + packagename : 'packages'} now. Please wait a moment.`);
  let op;
  const cd = path ? 'cd '+ path +' && ' : '';
  if(packagename) {
    op = await exec(cd + 'npm install '+ packagename);
  } else {
    op = await exec(cd + 'npm install');
  }
  console.error(op.stderr);
  console.log(op.stdout);
  return op;
}

const __makeSureFolderExists = (filepath) => {
  if(!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
  }
}

const extendFile = (filepath,filename, extension) => {
  if(filepath != '.' || filepath != './')
    __makeSureFolderExists(filepath);
  if(filepath === './') filepath = '.';
  let templates = fs.readFileSync(filepath+'/'+filename, "utf8");
  templates += '\n' + extension;
  fs.writeFileSync(filepath+'/'+filename, templates);
  return true;
}

const insertInFileBefore = (filepath, filename, insertion, before) => {
  __makeSureFolderExists(filepath);
  let templates = fs.readFileSync(filepath+'/'+filename, "utf8");
  let indexEnd = templates.indexOf(before) - before.length;
  if(indexEnd < 0) indexEnd = 0;
  templates = templates.slice(0, indexEnd) + insertion + templates.slice(indexEnd);
  fs.writeFileSync(filepath+'/'+filename, templates)
}

const insertInFileAfter = (filepath, filename, insertion, after) => {
  __makeSureFolderExists(filepath);
  let templates = fs.readFileSync(filepath+'/'+filename, "utf8");
  let indexEnd = templates.indexOf(after) + after.length;
  templates = templates.slice(0, indexEnd + 1) + insertion + templates.slice(indexEnd);
  fs.writeFileSync(filepath+'/'+filename, templates)
  return true;
}


const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const __getNameOfSource = (source) => {
  return source.split('.export.js')[0];
}

const _writeExports = (destinationPath, sourcePath, src, args) => {
  try {
    if(!fs.existsSync(destinationPath)) fs.mkdirSync(destinationPath);
    let file = require(sourcePath+'/'+src);
    if(typeof file === 'function') file = file(args[0], ...args);
    fs.writeFileSync(destinationPath+'/'+__getNameOfSource(src), file);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const _findFolders = (path) => {
  return fs.readdirSync(path).filter((filename) => !filename.includes('.js'));
}

const _getFilesInFolder = (path) => {
  return fs.readdirSync(path).filter((filename) => filename.includes('.export.js'));
}

const buildStructure = (sourcePath, destinationPath, args) => {
  _getFilesInFolder(sourcePath).forEach((file) => {
    _writeExports(destinationPath, sourcePath, file, args);
  })
  _findFolders(sourcePath).forEach(folder => {
    fs.mkdirSync(destinationPath+'/'+folder);
    buildStructure(sourcePath+'/'+folder, destinationPath+'/'+folder, args);
  })
}


module.exports = {
  installNpmPackage,
  extendFile,
  insertInFileBefore,
  insertInFileAfter,
  deleteFolderRecursive,
  buildStructure
}
