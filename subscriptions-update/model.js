/* jshint node: true */
/* jshint esnext: true */

'use strict';

const mongoose = require("mongoose");

var subscriptionsSchema = mongoose.Schema({
    _id: Number,
    url: String,
    channel: {
        title: String,
        description: String,
        link: String,
        pubDate: String,
        image: String
    },
    items: [
        {
            title: String,
            description: String,
            link: String
        }
    ]
});

var Subscription = mongoose.model('Subscription', subscriptionsSchema);

module.exports = {
    Subscription
};
