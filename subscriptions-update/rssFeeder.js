/* jshint node: true */
/* jshint esnext: true */

'use strict';

var request = require('request');
var fs = require('fs');
var FeedParser = require('feedparser');

class RssFeeder {

    promisedGet(feed, outfile) {
        return new Promise(function(resolve, reject) {
//            console.log(">>> promisedGet; feed :" + feed + ":");
            request.get(feed)
            .on('error', function(error) {
                console.error("ERROR in promisedGet; error " + error);
                reject("rejected; error "+error);
            })
            .on('response', function(res) {
//                console.log(">>> on response");
//                console.log(res.statusCode);
//                console.log(res.headers['content-type']);
                if (res.statusCode !== 200) {
                    this.emit('error', new Error('Bad status code'));
                }
//                console.log("<<< on response");
            })
            .pipe(fs.createWriteStream(outfile))
            .on('finish', function() {
                console.log('promisedGet, feed downloaded and saved to xml file');
                resolve();
            });
//            console.log("<<< promisedGet; feed :" + feed + ":");
        });
    }

    promisedJson(xmlFile, jsonFile) {
        const json = {
            meta: '',
            items: []
        }
        return new Promise(function(resolve, reject) {
//            console.log(">>> promisedJson; xmlFile :" + xmlFile + ":");
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
                console.log('promisedJson, xml converted to json');
                if (typeof jsonFile !== 'undefined') {
                    fs.writeFileSync(jsonFile, JSON.stringify(json) , 'utf-8');
                }
                resolve(json);
            });
//            console.log("<<< promisedJson; xmlFile :" + xmlFile + ":");
        });
    }

    get(feed, outfile) {
        console.log(">>> get; feed :" + feed + ":");
        request.get(feed)
        .on('error', function(error) {
            console.error("ERROR in get; error " + err);
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

    parseXml(xmlFile, callback) {
        const json = {
            meta: '',
            items: []
        }
        fs.createReadStream(xmlFile)
        .on('error', function (error) {
            console.error(error);
        })
        .pipe(new FeedParser())
        .on('error', function (error) {
            console.error(error);
        })
        .on('meta', function (meta) {
            json.meta = meta;
        })
        .on('readable', function() {
            let stream = this, item;
            while (item = stream.read()) {
                json.items.push(item);
            }
        })
        .on('finish', function() {
            console.log('Done parseXml!');
            callback(json);
        });
    }
}

module.exports = RssFeeder;
