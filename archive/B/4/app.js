/* jshint node: true */
/* jshint esnext: true */

/*
https://github.com/danmactough/node-feedparser

https://www.npmjs.com/package/feedparser

npm install feedparser --save
npm install request --save
npm install mongoose --save
*/

'use strict';

let RssFeeder = require('./rssFeeder');
let Utils = require('./utils');

var mongoose = require("mongoose");

const {Subscription} = require('./model');

mongoose.connect("mongodb://localhost:27017/news-reader");
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function() {
    console.log("Connection succeeded.");
    do2();
});
db.on("disconnected", function() {
    console.log("disconnected");
});

let rssFeeder = new RssFeeder();
let utils = new Utils();

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
3. close connection
*/

function do2() {
    Subscription.find()
    .exec()
    .then(doc => {
        doc.forEach((item, idx, array) => {
            console.log('Found subscription: Id %d Url %s', item.file_id, item.url);
            rssFeeder.promisedGet(item.url, makePath('xml', item.file_id, 'xml'))
            .then(() => {
                rssFeeder.promisedJson(makePath('xml', item.file_id, 'xml'),
                                       makePath('json', item.file_id, 'json'))
                .then((json) => {
                    let obj = utils.transform(json);

                    Subscription.findByIdAndUpdate(item.id,
                        {$set: {channel: obj.channel, items: obj.items}},
                        {$upsert: true})
                    .exec()
                    .then((doc)=> {
                        console.log('Subscription updated: Id %d Url %s', doc.file_id, doc.url);
                    })
                    .catch(err => {
                        console.error('**** Update Error; Reason '+err);
                    })
                })
                .catch(function(err) {
                    console.error('Error on Parse to json; fid '+item.file_id+' Reason: ', err);
                    throw Error('Error on Parse to json; fid '+item.file_id+' Reason: ', err);
                })
            })
            .catch(function(err) {
                console.error('Error on Get URL; Url '+item.url+' Reason: ', err);
                throw Error('Error on Parse to json; fid '+item.file_id+' Reason: ', err);
            });

        });
    })
    .catch(function(err) {
        console.error('Error; Reason: ', err);
    });
}

/*
1. iterate over feeds
2. get xml feed, save as file
2a. parse Xml file to json, save as file.
*/


let subscriptions = [
    {
        url: "http://rss.cnn.com/rss/edition.rss",
        file_id: "1"
    },
    {
        url: "http://feeds.bbci.co.uk/news/rss.xml",
        file_id: "2"
    }
];

function do1() {
    let rssFeeder = new RssFeeder();
    subscriptions.forEach((item, idx, array) => {
        console.log("item :"+item.url);
        rssFeeder.promisedGet(item.url, makePath('xml', item.file_id, 'xml'))
        .then(() => {
            rssFeeder.promisedJson(makePath('xml', item.file_id, 'xml'),
                                   makePath('json', item.file_id, 'json'))
            .then(() => {

            })
            .catch(function(err) {
                console.error('Error on Parse to json; fid '+item.file_id+' Reason: ', err);
                throw Error('Error on Parse to json; fid '+item.file_id+' Reason: ', err);
            })
        })
        .catch(function(err) {
            console.error('Error on Get URL; Url '+item.url+' Reason: ', err);
            throw Error('Error on Parse to json; fid '+item.file_id+' Reason: ', err);
        });
        if (idx === array.length - 1) {
            db.close();
        }
    });
}

function makePath(subdir, fid, ext) {
    return __dirname+"/"+subdir+"/"+fid+"."+ext;
}





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
