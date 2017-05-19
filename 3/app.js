/* jshint node: true */
/* jshint esnext: true */

/*
https://github.com/danmactough/node-feedparser

https://www.npmjs.com/package/feedparser

npm install feedparser --save
npm install request --save
*/

'use strict';

let RssFeeder = require('./rssFeeder');

let feeds = [
    {
        url: "http://rss.cnn.com/rss/edition.rss",
        fid: "1"
    },
    {
        url: "http://feeds.bbci.co.uk/news/rss.xml",
        fid: "2"
    }
];

do1();

/*
1. iterate over feeds
2. get xml feed, save as file
2a. parse Xml file to json, save as file.
*/

function do1() {
    let rssFeeder = new RssFeeder();
    feeds.forEach((item) => {
        console.log("item :"+item.url);
        rssFeeder.promisedGet(item.url, makePath('xml', item.fid, 'xml'))
        .then(() => {
            rssFeeder.promisedJson(makePath('xml', item.fid, 'xml'),
                                   makePath('json', item.fid, 'json'))
            .then(() => {
            })
            .catch(function(err) {
                console.error('Error on Parse to json; fid '+item.fid+' Reason: ', err);
                throw Error('Error on Parse to json; fid '+item.fid+' Reason: ', err);
            });
        })
        .catch(function(err) {
            console.error('Error on Get URL; Url '+item.url+' Reason: ', err);
        });
    });
}

function makePath(subdir, fid, ext) {
    return __dirname+"/"+subdir+"/"+fid+"."+ext;
}




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


