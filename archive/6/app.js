/* jshint node: true */
/* jshint esnext: true */

/*
https://ricochen.wordpress.com/2011/11/15/a-simple-node-js-rss-parser-using-sax-js/

npm install http --save
npm install sax --save

only gives the articles, not the channel
*/

'use strict';

let rssFeed = "http://rss.cnn.com/rss/edition.rss";

var config =
{
    host: 'rss.cnn.com',
    path: '/rss/edition.rss',
    port: 80
};

var rss=require('./saxrss.js');
var host='rss.cnn.com';
// to get finance headlines about stock AAPL
var path='/rss/edition.rss';

rss.get_rss(host, 80, path, function(items) {
    debugger;
    console.log(items);
});
