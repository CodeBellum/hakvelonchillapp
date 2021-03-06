var express = require('express');
var router = express.Router();
var dbhelper = require('./dbhelper');

router.get('/version', function(req, res, next) {
    var version = {version : 'test'};
    sendJsonOKResult(res, version);
});

router.get('/phrases', function(req, res, next) {
    /*var phrases = [
        {
            id : 1,
            phrase : 'test phrase 1',
            font_size : 24,
            secondary_phrase : '',
            secondary_font_size : -1,
            sound_name : 'test.mp3'
        },
        {
            id : 2,
            phrase : 'test phrase 2',
            font_size : 26,
            secondary_phrase : '',
            secondary_font_size : -1,
            sound_name : 'test2.mp3'
        },
    ];*/

    dbhelper.getPhrases().then(phrases => {
       sendJsonOKResult(res, phrases);
    });
});

router.post('/phrases', function(req, res, next) {
    console.log(req.body);
     dbhelper.insertRecord(req.body).then(() => {
         sendJsonOKResult(res);
     });
});

router.delete('/phrases', function(req, res, next) {
    dbhelper.deletePhrases().then(() => {
        sendJsonOKResult(res);
    });
});

function sendJsonOKResult(res, json){
    res.status(200);
    res.json(json);
    res.end();
}

module.exports = router;