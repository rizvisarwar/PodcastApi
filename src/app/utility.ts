import { Episode } from "./typings/entities";
import { Episodes } from "./typings/responses";
import axios from "axios";
import crypto from "crypto";

async function getItemsFromRSS(url: string) {
  let Parser = require("rss-parser");
  let parser = new Parser();
  let episodes: Episodes = [];

  try {
    let response = await parser.parseURL(url);

    //taking first two items from the list
    const slicedItems = response.items.slice(0,2);
    const promises = slicedItems.map(async function (item: { enclosure: { url: string; }; title: string; link: string; }) {
        const res = await axios.get(item.enclosure.url);
        let data: Episode = episode(
          item.title,
          generateChecksum(res.data),
          item.link
        );
        episodes.push(data);
      });
    // wait until all promises are resolved
    await Promise.all(promises);

    return episodes;
  } catch (error) {
    throw error;
  }
}

function generateChecksum(str: string) {
  return crypto.createHash("md5").update(str, "utf8").digest("hex");
}

const episode = (title: string, checkoutsum: string, url: string): Episode => {
  try {
    return {
      title: title,
      checkoutsum: checkoutsum,
      url: url,
    };
  } catch (err) {
    return {
      title: title,
      checkoutsum: checkoutsum,
      url: url,
    };
  }
};

module.exports = { getItemsFromRSS };
