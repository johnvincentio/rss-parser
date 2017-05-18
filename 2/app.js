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

let rssFeed1 = "http://rss.cnn.com/rss/edition.rss";
let outfile1 = __dirname+"/feeds/1.xml";
let jsonfile1 = __dirname+"/feeds/1.json";

let rssFeed2 = "http://feeds.bbci.co.uk/news/rss.xml";
let outfile2 = __dirname+"/feeds/2.xml";
let jsonfile2 = __dirname+"/feeds/2.json";

let rssFeed3 = "http://feeds.bbci.co.uk/newsbad/rss.xml";
let outfile3 = __dirname+"/feeds/3.xml";
let jsonfile3 = __dirname+"/feeds/3.json";

/*
1. get Subscriptions from mongo
2. For each subscription,
2a.     determine feed url
2b.     get the xml from the feed url
2c.     save the feed as xml file.
2d.     parse the XML into json
2e.     determine channel data
2f.     determine items data
2g.     insert/replace data in mongo.
*/

function test1() {
    var rssFeeder = new RssFeeder();
    rssFeeder.get(rssFeed, outfile);
}

function test1a() {
    var rssFeeder = new RssFeeder();
    rssFeeder.promisedGet(rssFeed1, outfile1)
    .then(() => {
        rssFeeder.promisedGet(rssFeed2, outfile2);
    })
    .catch(function(err) {
        console.log('Catch: ', err);
    });
}

function test1b() {
    var rssFeeder = new RssFeeder();
    rssFeeder.promisedGet(rssFeed3, outfile3)
    .then(() => {
        console.log("test1b; done promisedGet");
    })
    .catch(function(err) {
        console.log('Catch: ', err);
    });
}

function test3() {
    var rssFeeder = new RssFeeder();
    rssFeeder.parseXml(outfile1, callback);
}

function callback(json) {
    console.log("json "+JSON.stringify(json));
}

function test2() {
    var rssFeeder = new RssFeeder();
    rssFeeder.promisedJson(outfile1)
    .then((json) => {
        console.log("json :"+json+":");
        console.log("test2; done promisedJson");
        debugger;
    })
    .catch(function(err) {
        console.log('Catch: ', err);
    });
}

function test2a() {
    var rssFeeder = new RssFeeder();
    rssFeeder.promisedJson(outfile1, jsonfile1)
    .then(() => {
        rssFeeder.promisedJson(outfile2, jsonfile2);
    })
    .catch(function(err) {
        console.log('Catch: ', err);
    });
}

test2a();

