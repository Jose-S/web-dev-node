const express = require('express')
const app = express()

// Configuring Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/webdev')

// Configure CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

require('./movies/service')(app);
require('./tweets/tweets-service')(app);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}
app.listen(port);