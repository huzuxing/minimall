/**
 * Created by zzy on 17/3/6.
 */
'use strict';
let express = require('express');
let router = express.Router();

let app = express();

app.use('*', function (req, res) {
    console.log(333);
});

module.exports = app;