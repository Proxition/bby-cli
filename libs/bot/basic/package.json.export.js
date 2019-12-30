module.exports= (projectname) => {
  return `{
  "name": "${projectname}",
  "version": "1.0.0",
  "description": "this was created with the bby-cli",
  "main": "index.js",
  "scripts": {
      "start": "node index.js",
      "start-watch": "nodemon index.js",
      "test-watch": "jest --watchAll"
  },
  "author": "bby-cli",
  "license": "ISC",
  "devDependencies": {
      "jest": "^23.5.0",
      "nodemon": "^1.18.3"
  },
  "dependencies":{
      "dotenv": "^6.0.0"
  }
}`
}
