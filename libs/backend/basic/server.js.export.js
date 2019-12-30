module.exports = `
require('dotenv').config();
const app = require('./app.js')

const PORT = process.env.PORT || 44800

app.listen(PORT, () => {
    console.log('Listening on Port', PORT)
})
`