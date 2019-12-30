module.exports = (projectname) => {
  return `
  {
    "name": "${projectname}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "build": "tsc",
      "lint": "eslint src --ext ts",
      "start": "npm run build:live",
      "build:live": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts",
      "test": "jest ./src/tests"
    },
    "author": "bby-cli",
    "license": "ISC",
    "dependencies": {
      "body-parser": "^1.19.0",
      "cors": "^2.8.5",
      "dotenv": "^8.0.0",
      "express": "^4.17.1"
    },
    "devDependencies": {
      "ts-node": "^8.3.0",
      "typescript": "^3.5.2",
      "@types/node": "^12.0.10",
      "eslint": "^6.0.1",
      "@typescript-eslint/eslint-plugin": "^1.11.0",
      "@typescript-eslint/parser": "^1.11.0",
      "jest": "^24.8.0",
      "nodemon": "^1.19.1"
    }
  }
  `
}
