module.exports = `
const fs = require("fs");
const path = require("path");
const dir = "./customHandlers" // from services folder to customHandlers

const variation = require('./../utils/variation')
const cError = require('./../utils/customError')


module.exports = (function () {
  const walkSync = (dir, fileList = []) => {
    fs.readdirSync(dir).forEach(file => {
      fileList = fs.statSync(path.join(dir, file)).isDirectory()
        ? walkSync(path.join(dir, file), fileList)
        : fileList.concat(path.join(dir, file));
    });
  return fileList;
  };
  const getFileNamesOfCustomHandlers = (dir) => {
    let fileList = [];
    try {
      fileList = walkSync(dir, fileList);
    } catch (error) {
      // Handle error
      if (error.code == "ENOENT") {
        console.error("No customHandlers Folder found.");
      } else {
        console.error("Error in trying to check for customHandlers.", error);
      }
    }
    return fileList;
  };

  const getCustomHandlers = () => {
    let customHandlers = [];
    getFileNamesOfCustomHandlers(dir).forEach(filePath => {
      if (filePath.includes(".handler.js") && fs.existsSync("./" + filePath)) {
        customHandlers.push(...require("./../" + filePath))
      }
    })
    return customHandlers;
  };

  let lib = {};

  let handlers = [];
  const fallbackHandlers = [
    // Business logic
    // Ordered by most specific first
    handler(
      (input) => input.intent === 'hello',
      (input) => 'Hi there, how are you?'
    ),
    handler(
      (input) => input.intent === 'whoAreYou',
      (input) => 'I am a bot created with bby-cli'
    ),
    handler(
      (input) => input.intent === 'help',
      (input) => \`You called for help? How can I help you? This command has not yet be overwritten for a more detailed help.\`
    ),
    handler(
      (input) => input.intent === 'goodbye',
      (input) => \`Have a nice day. I hope we see us soon again.\`
    ),
    // End Business logic
  ];
  handlers.push(...getCustomHandlers(), ...fallbackHandlers);
  console.log(handlers.length, " handlers mounted.");

  lib.handle = (input, getService) => {
    let response;
    try {
      response = variation(handlers.find(handler => handler.canHandle(input)).handle(input, getService));
    } catch (e) {
      if (e.type) {
        throw new cError(e.message, e.type)
      } else {
        console.error(e)
        response = \`I don't know how to help you with that.\`
      }
    }
    return response
  }
  return lib;

  function handler(conditionFn, handlerFn) {
    return {
      canHandle: conditionFn,
      handle: handlerFn,
    };
  }
})();
`
