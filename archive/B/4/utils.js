/* jshint node: true */
/* jshint esnext: true */

'use strict';

class Utils {

    transform(input) {
        try {
            let meta = input.meta;
            let arr = input.items;

            let channel = {};
            channel.title = meta.title;
            channel.description = meta.description;
            channel.link = meta.link;
            channel.pubDate = meta.pubDate;
            channel.image = meta.image.url;

            let items = [];
            arr.forEach((entry, idx, array) => {
                let obj = {};
                obj.title = entry.title;
                obj.description = entry.description;
                obj.link = entry.link;
                items.push(obj);
            });

            let json = {};
            json.channel = channel;
            json.items = items;
            return json;
        }
        catch(err) {
            console.error('Transform error; '+err)
            throw Error('Error on transform to json. Reason: ', err);
        }
    }
}

module.exports = Utils;
