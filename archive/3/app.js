/* jshint node: true */
/* jshint esnext: true */

/*
https://www.npmjs.com/package/feederjs

npm install --save feederjs
*/

'use strict';

let rssFeed = "http://rss.cnn.com/rss/edition.rss";

const feeder = require('feederjs');
feeder.getFeed(rssFeed, (feed, data) => {
    debugger;
    if (data instanceof feeder.FeederException) {
        console.log('error: ' + feed.message);
    } else {
        console.log(feed.title);
    }
});
