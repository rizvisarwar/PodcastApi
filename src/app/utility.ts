import { Episode } from "./typings/entities";
import { Episodes } from "./typings/responses";
import axios from "axios";
import crypto from "crypto";

let episodes: Episodes = [];

async function getItemsFromRSS(url: string, callBack: any) {
  let Parser = require("rss-parser");
  let parser = new Parser();

  try {
    let response = await parser.parseURL(url);

    const slicedItems = response.items.slice(0, 50);
    slicedItems.map(mapMetaData);
    callBack(episodes);
  } catch (error) {
    throw error;
  } finally {
    episodes = [];
  }
}

function mapMetaData(item: {
  enclosure: { url: string };
  title: string;
  link: string;
}) {
  // const res = axios.get(item.enclosure.url);
  let data: Episode = episode(
    item.title,
    generateChecksum("res.data"),
    item.link
  );
  episodes.push(data);
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
