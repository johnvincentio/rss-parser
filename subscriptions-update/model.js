/* jshint node: true */
/* jshint esnext: true */

'use strict';

const mongoose = require("mongoose");

var subscriptionsSchema = mongoose.Schema({
    url: String,
    file_id: Number,
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
