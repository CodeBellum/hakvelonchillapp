var express = require('express');
var router = express.Router();

router.get('/version', function(req, res, next) {
    var version = {version : 'test'};
    sendJsonOKResult(res, version);
});

function sendJsonOKResult(res, json){
    res.status(200);
    res.json(json);
    res.end();
}