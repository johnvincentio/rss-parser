

https://www.npmjs.com/package/rss-parser

npm install rss-parser --save


http://feeds.reuters.com/news/artsculture?format=xml



  var makePromise = function makePromise(value, resolved) {
    var result = new Deferred();
    if (resolved) {
      result.resolve(value);
    } else {
      result.reject(value);
    }
    return result.promise;
  };

function makePromise(func, text) {
    return new Promise(function(resolve, reject) {
        console.log(">>> makePromise");
        func.then(() => {
            console.log(text);
            resolve(text);
        })
        .catch(err => {
            console.error(err);
            reject(text+" rejected");
        });
        console.log("<<< makePromise");
    });
}

