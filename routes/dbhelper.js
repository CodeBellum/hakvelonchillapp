const sqlite3 = require('sqlite3').verbose();
const dbName = 'phrases.db';
// open the database

function getDbInstance() {
    return new sqlite3.Database(dbName, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the phrases database.');
    });
}

function initialize() {
    var db = getDbInstance();

    var promise = new Promise(function (resolve, reject) {
        var createSql = `CREATE TABLE IF NOT EXISTS Phrases (
 id integer PRIMARY KEY AUTOINCREMENT,
 phrase text NOT NULL,
 font_size integer NOT NULL,
 secondary_phrase text NULL,
 secondary_font_size integer NULL,
 sound_name text NOT NULL,
 min_show_time integer NOT NULL,
 max_show_time integer NOT NULL)`;

        db.run(createSql, [], function(err) {
            if (err) {
                console.error(err.message);
                reject();
            }

            console.log('Script executed successfully.');
            resolve();
        });
    });

    promise.then(function () {
        return new Promise(function (resolve, reject) {
            let stringData = ['test phrase 1', 'test1.mp3', 'test phrase 2', 'test3.mp3'];
            let initializationScript = 'INSERT INTO Phrases(phrase, font_size, sound_name, min_show_time, max_show_time) VALUES (?, 24, ?, 4000, 8000), (?, 26, ?, 4000, 8000)';
            db.run(initializationScript, stringData, function(err) {
                    if (err) {
                        reject(console.error(err.message));
                    }

                    console.log('Initialization script executed successfully.');
                    resolve();
                }
            );
        });
    });

    promise.then( function () {
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the phrases connection.');
        });
    });

    return promise;
}

function getPhrases() {
    var db = getDbInstance();

    let sql = `SELECT * FROM Phrases`;

    var promise = new Promise(function(resolve, reject) {
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject();
            }

            resolve(rows);
        });
    }).then(result => {
        return new Promise( function (resolve, reject) {
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                    reject();
                }

                console.log('Close the phrases connection.');
            });
            resolve(result);
        });
    });

    return promise;
}

exports.getPhrases = getPhrases;
exports.initialize = initialize;
exports.dbName = dbName;
