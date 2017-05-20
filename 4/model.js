/* jshint node: true */
/* jshint esnext: true */

'use strict';

const mongoose = require("mongoose");

var subscriptionsSchema = mongoose.Schema({
    url: String,
    file_id: Number,
    channel: String,
    items: String
});

var Subscription = mongoose.model('Subscription', subscriptionsSchema);

module.exports = {
    Subscription
};
