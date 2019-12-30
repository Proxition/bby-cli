module.exports = `
app = require('./app.js')

const PORT = process.env.PORT || 44800

app.listen(PORT, (): void => {
    return console.log('Listening on Port', PORT)
})
`
