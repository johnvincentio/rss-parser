/* jshint node: true */
/* jshint esnext: true */

'use strict';

var parser = require('rss-parser');

let rssFeed = "http://rss.cnn.com/rss/edition.rss";

parser.parseURL(rssFeed, function(err, parsed) {
    console.log(parsed.feed.title);
    parsed.feed.entries.forEach(function(entry) {
        console.log(entry.title + ':' + entry.link);
        debugger;
    });
});
