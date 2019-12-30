module.exports = `
const express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');


//const route1 = require('./routes/route1')
//const route2 = require('./routes/route2')

let app = express();
app.use(cors());
app.use(bodyParser.json());

//app.use('/route1', route1)
//app.use('/route2', route2)


module.exports = app;
`
