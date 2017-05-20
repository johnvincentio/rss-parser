/* jshint node: true */
/* jshint esnext: true */

/*
https://www.npmjs.com/package/feedparser

npm install feedparser --save
npm install request --save
*/

'use strict';

var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed

let rssFeed = "http://rss.cnn.com/rss/edition.rss";

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
var req = request(rssFeed);
var feedparser = new FeedParser([options]);

req.on('error', function (error) {
  // handle any request errors
});

req.on('response', function (res) {
  var stream = this; // `this` is `req`, which is a stream

  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'));
  }
  else {
    stream.pipe(feedparser);
  }
});

feedparser.on('error', function (error) {
  // always handle errors
});

feedparser.on('readable', function () {
  // This is where the action is!
  var stream = this; // `this` is `feedparser`, which is a stream
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
  var item;

  while (item = stream.read()) {
    console.log(item);
  }
});
*/
