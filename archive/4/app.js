/* jshint node: true */
/* jshint esnext: true */

/*
https://www.npmjs.com/package/feed-read

npm install feed-read
*/
// Each article has the following properties:
//
//   * "title"     - The article title (String).
//   * "author"    - The author's name (String).
//   * "link"      - The original article link (String).
//   * "content"   - The HTML content of the article (String).
//   * "published" - The date that the article was published (Date).
//   * "feed"      - {name, source, link}
//
/*
only gets articles.

I also want the feed data
*/

'use strict';

let rssFeed = "http://rss.cnn.com/rss/edition.rss";

var feed = require("feed-read");

feed(rssFeed, function(err, articles) {
    if (err) throw err;
    console.log("in feed");
    debugger;
});
