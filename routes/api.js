var express = require('express');
var router = express.Router();

router.get('/version', function(req, res, next) {
    var version = {version : 'test'};
    sendJsonOKResult(res, version);
});

router.get('/phrases', function(req, res, next) {
    var phrases = [
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
    ];

    sendJsonOKResult(res, phrases);
});

function sendJsonOKResult(res, json){
    res.status(200);
    res.json(json);
    res.end();
}

module.exports = router;