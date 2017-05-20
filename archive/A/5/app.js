/* jshint node: true */
/* jshint esnext: true */

/*
https://ricochen.wordpress.com/2011/11/15/a-simple-node-js-rss-parser-using-sax-js/

npm install http
npm install xml-simple

this works!!!
*/

'use strict';

let rssFeed = "http://rss.cnn.com/rss/edition.rss";

// getting xml and convert to json object using xml-simple example
var http = require('http');
var simplexml = require('xml-simple');
var config =
{
    host: 'rss.cnn.com',
    path: '/rss/edition.rss',
    port: 80
};
var body = '';

http.get(config, function(res) {
    res.addListener('end', function() {
        simplexml.parse(body, function(e, parsed) {
            console.log(parsed.channel.item);
            console.log(JSON.stringify(parsed));
        });
    });
    res.setEncoding('utf8');
    res.on('data', function(d) {
        body += d;
    });
});


/*
    var config =
{
    host: 'feeds.finance.yahoo.com',
    path: '/rss/2.0/headline?s=aapl&region=US&lang=en-US',
    port: 80
};
*/
