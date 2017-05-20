/* jshint node: true */
/* jshint esnext: true */

/*
npm install mongoose --save
*/

'use strict';

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/news-reader");
mongoose.Promise = global.Promise;

var subscriptionsSchema = mongoose.Schema({
    url: String,
    file_id: Number
});

var Subscription = mongoose.model('Subscription', subscriptionsSchema);

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

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function() {
    console.log("Connection succeeded.");
    test9();
});
db.on("disconnected", function() {
    console.log("disconnected");
});

function test9() {
    console.log(">>> test9");
    makePromise(Subscription.remove().exec(), 'Deleting Subscription records')
    .then(() => {
        makePromise(Subscription.create(subscriptions), 'Create Subscriptions')
        .then(() => {
            Subscription.find()
            .exec()
            .then(doc => {
                doc.forEach(item => {
                    console.log("(1) Found: "+item);
                    console.log('Id %d Url %s', item.file_id, item.url);
                });
            })
            .then(() => {
                db.close();
            })
        })
    })
    .catch(function(err) {
        console.log('Catch: ', err);
    });
    console.log("<<< test9");
}

function makePromise(func, text) {
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
