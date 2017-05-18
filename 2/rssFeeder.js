/* jshint node: true */
/* jshint esnext: true */

'use strict';

var request = require('request');
var fs = require('fs');
var FeedParser = require('feedparser');

class RssFeeder {

    promisedGet(feed, outfile) {
        return new Promise(function(resolve, reject) {
            console.log(">>> promisedGet; feed :" + feed + ":");
            request.get(feed)
                .on('error', function(error) {
                    console.err("ERROR in promisedGet; error " + err);
                    reject("rejected; error "+err);
                })
                .on('response', function(res) {
                    console.log(">>> on response");
                    console.log(res.statusCode);
                    console.log(res.headers['content-type']);
                    if (res.statusCode !== 200) {
                        this.emit('error', new Error('Bad status code'));
                    }
                    console.log("<<< on response");
                })
                .pipe(fs.createWriteStream(outfile))
                .on('finish', function() {
                    console.log('Done downloading and saving!');
                    resolve();
                });
            console.log("<<< promisedGet; feed :" + feed + ":");
        });
    }

    get(feed, outfile) {
        console.log(">>> get; feed :" + feed + ":");
        request.get(feed)
            .on('error', function(error) {
                console.err("ERROR in get; error " + err);
            })
            .on('response', function(res) {
                console.log(">>> on response");
                console.log(res.statusCode);
                console.log(res.headers['content-type']);
                if (res.statusCode !== 200) {
                    this.emit('error', new Error('Bad status code'));
                }
                console.log("<<< on response");
            })
            .pipe(fs.createWriteStream(outfile))
            .on('finish', function() {
                console.log('Done downloading and saving!');
            });
        console.log("<<< get; feed :" + feed + ":");
    }

    promisedJson(xmlFile) {
        const json = {
            items: []
        }
        return new Promise(function(resolve, reject) {
            console.log(">>> promisedJson; xmlFile :" + xmlFile + ":");
            fs.createReadStream(xmlFile)
                .on('error', function(error) {
                    console.error(error);
                    reject("rejected createReadStream");
                })
                .pipe(new FeedParser())
                .on('error', function(error) {
                    console.error(error);
                    reject("rejected pipe");
                })
                .on('meta', function(meta) {
                    json.meta = meta;
                })
                .on('readable', function() {
                    let stream = this, item;
                    while (item = stream.read()) {
                        json.items.push(item);
                    }
                })
                .on('finish', function() {
                    debugger;
                    console.log('Done promisedJson');
                    resolve(json);
                });
            console.log("<<< promisedJson; xmlFile :" + xmlFile + ":");
        });
    }

    makePromise(func, text) {
        return new Promise(function(resolve, reject) {
            console.log(">>> makePromise");
            func.then(() => {
                console.log(text);
                resolve(text);
            })
            .catch(err => {
                console.error(err);
                reject(text + " rejected");
            });
            console.log("<<< makePromise");
        });
    }

}

module.exports = RssFeeder;


/*
    parseXml(xmlFile) {
        fs.createReadStream(xmlFile)
        .on('error', function (error) {
            console.error(error);
        })
        .pipe(new FeedParser())
        .on('error', function (error) {
            console.error(error);
        })
        .on('meta', function (meta) {
            console.log('===== %s =====', meta.title);
        })
        .on('readable', function() {
            var stream = this, item;
            while (item = stream.read()) {
                console.log('Got article: %s', item.title || item.description);
            }
        })
        .on('finish', function() {
            debugger;
            console.log('Done parseXml!');
        });
    }
*/

/*
    parse(feed) {
        console.log(">>> parse; feed :"+feed+":");
        var options = {};
        var feedparser = new FeedParser([options]);

        request.get(feed)
        .on('error', function(error) {
            console.log(">>> on error");
            // handle any request errors
            console.log("<<< on error");
        })
        .on('response', function(res) {
            console.log(">>> on response");
            console.log(res.statusCode);
            console.log(res.headers['content-type']);

            var stream = this; // `this` is `req`, which is a stream

            if (res.statusCode !== 200) {
                this.emit('error', new Error('Bad status code'));
            } else {
                stream.pipe(feedparser);
            }

            console.log("<<< on response");
        });
//        .pipe(feedparser);
//        .done();

//        console.log("<<< parse; feed :"+feed+":");
    }
*/


/*
let url = 'http://example.com/super-sensitive-data.json';
let pwd = new Buffer('myPassword');

let aesTransform = crypto.createCipher('aes-256-cbc', pwd);
let fileStream = fs.createWriteStream('encrypted.json');

request(url)
    .pipe(aesTransform)     // Encrypts with aes256
    .pipe(fileStream)       // Write encrypted data to a file
    .on('finish', function() {
        console.log('Done downloading, encrypting, and saving!');
    });


let fileStream = fs.createWriteStream('node.png');
request('https://nodejs.org/static/images/logos/nodejs-new-white-pantone.png').pipe(fileStream);

let req = request.defaults({
    headers: {
        'x-access-token': '123abc',
        'User-Agent': 'my-reddit-client'
    }
});

req('http://your-api.com', function(err, res, body) {
    console.log(body);
});

let options = {
    url: 'https://www.google.com',
    proxy: 'http://myproxy.com'
};

request(options, callback);


*/

/*
var options = {};

let items = [];

var req = request(rssFeed);
var feedparser = new FeedParser([options]);

req.on('error', function(error) {
    // handle any request errors
});

req.on('response', function(res) {
    console.log(">>> on response");
    var stream = this; // `this` is `req`, which is a stream

    if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'));
    } else {
        stream.pipe(feedparser);
    }
    console.log("<<< on response");
});

feedparser.on('error', function(error) {
    // always handle errors
});
feedparser.on('end', done);

function done() {
    console.log(">>> done");
    debugger;
    console.log("<<< done");
}

feedparser.on('readable', function() {
    console.log(">>> on readable");
    // This is where the action is!
    var stream = this; // `this` is `feedparser`, which is a stream
    var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    var packet;

    while (packet = stream.read()) {
        items.push(packet);
//        console.log(item);
    }
    handle(meta);
    console.log("<<< on readable");
});

function handle(meta) {
    console.log(">>> handle");
//    console.log(meta);
    console.log("<<< handle");
}
*/

/*
var FeedParser = require(__dirname+'/..')
  , fs = require('fs')
  , feed = __dirname+'/../test/feeds/rss2sample.xml';

fs.createReadStream(feed)
  .on('error', function (error) {
    console.error(error);
  })
  .pipe(new FeedParser())
  .on('error', function (error) {
    console.error(error);
  })
  .on('meta', function (meta) {
    console.log('===== %s =====', meta.title);
  })
  .on('readable', function() {
    var stream = this, item;
    while (item = stream.read()) {
      console.log('Got article: %s', item.title || item.description);
    }
  });
*/

/*
    get(feed, outfile) {
        console.log(">>> get; feed :"+feed+":");
        request.get(feed)
        .on('error', function(error) {
            console.log(">>> on error");
            // handle any request errors
            console.log(err)
            console.log("<<< on error");
        })
        .on('response', function(res) {
            console.log(">>> on response");
            console.log(res.statusCode);
            console.log(res.headers['content-type']);
//            var stream = this; // `this` is `req`, which is a stream
            if (res.statusCode !== 200) {
                this.emit('error', new Error('Bad status code'));
            }
            console.log("<<< on response");
        })
        .pipe(fs.createWriteStream(outfile))
        .on('finish', function() {
            console.log('Done downloading, encrypting, and saving!');
            return 'abcd';
        });
        console.log("<<< get; feed :"+feed+":");
    }
*/
