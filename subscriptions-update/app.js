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
    doUpdate();
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

function doUpdate() {
    Subscription.find()
    .exec()
    .then(doc => {
        doc.forEach((item) => {
            console.log('Found subscription: Id %d Url %s', item._id, item.url);
            rssFeeder.promisedGet(item.url, makePath('xml', item._id, 'xml'))
            .then(() => {
                rssFeeder.promisedJson(makePath('xml', item._id, 'xml'),
                                       makePath('json', item._id, 'json'))
                .then((json) => {
                    let obj = utils.transform(json);
                    Subscription.findByIdAndUpdate(item.id,
                        {$set: {channel: obj.channel, items: obj.items}},
                        {$upsert: true})
                    .exec()
                    .then((doc)=> {
                        console.log('Subscription updated: Id %d Url %s', doc._id, doc.url);
                    })
                    .catch(err => {
                        console.error('**** Update Error; Reason '+err);
                    });
                })
                .catch(function(err) {
                    console.error('Error on Parse to json; fid '+item._id+' Reason: ', err);
                    throw Error('Error on Parse to json; fid '+item._id+' Reason: ', err);
                });
            })
            .catch(function(err) {
                console.error('Error on Get URL; Url '+item.url+' Reason: ', err);
//                throw Error('Error on Parse to json; fid '+item._id+' Reason: ', err);
            });
        });
    })
    .catch(function(err) {
        console.error('Error; Reason: ', err);
    });
}

function makePath(subdir, fid, ext) {
    return __dirname+"/"+subdir+"/"+fid+"."+ext;
}
