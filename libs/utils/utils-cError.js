module.exports = `
module.exports = class CustomError extends Error {
  constructor(message, type) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }

  createLog() {
    let obj = {
      timestamp: new Date(),
      message: this.message,
      type: this.type,
      name: this.name
    }
    console.error(\`\${obj.timestamp} : \${obj.type} - \${obj.message}\`)
    return obj;
  }
}
`
