/* jshint node: true */
/* jshint esnext: true */

/*
https://github.com/danmactough/node-feedparser

https://www.npmjs.com/package/feedparser

npm install feedparser --save
npm install request --save
*/

'use strict';

var RssFeeder = require('./rssFeeder');

let rssFeed = "http://rss.cnn.com/rss/edition.rss";
let outfile = __dirname+"/feeds/1.xml";

function test1() {
    var rssFeeder = new RssFeeder();
    rssFeeder.get(rssFeed, outfile);
    console.log("__dirname :"+__dirname+":");
}

function test2() {
    var rssFeeder = new RssFeeder();
    rssFeeder.parseXml(outfile);
//    console.log("__dirname :"+__dirname+":");
}

test2();

