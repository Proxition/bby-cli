module.exports= (projectname) => {
  return `{
  "name": "${projectname}",
  "version": "1.0.0",
  "description": "this was created with the bby-cli",
  "main": "server.js",
  "scripts": {
      "start": "node server.js",
      "start-watch": "nodemon server.js",
      "test-watch": "jest --watchAll"
  },
  "author": "bby-cli",
  "license": "ISC",
  "jest": {
    "testPathIgnorePatterns": [
      "/node_modules/"
    ],
    "watchPathIgnorePatterns": [
      "<rootDir>/jest.json",
      "/node_modules/"
    ]
  },
  "devDependencies": {
      "jest": "^23.5.0",
      "nodemon": "^1.18.3"
  },
  "dependencies":{
      "dotenv": "^6.0.0",
      "express": "^4.16.3",
      "body-parser": "^1.18.3",
      "axios": "^0.18.0",
      "cors": "^2.8.5"
  }
}`
}
