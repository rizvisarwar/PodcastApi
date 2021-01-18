import { Episode } from "./typings/entities";
import { Episodes } from "./typings/responses";

async function getItemsFromRSS(url: string) {
  let Parser = require("rss-parser");
  let parser = new Parser();
  let episodes: Episodes = [];

  try {
    let response = await parser.parseURL(url);
    response.items.forEach((item: { title: string; link: string; }) => {
          let data: Episode = episode(item.title, 123, item.link);
          episodes.push(data);
        });
    return episodes;
  } catch (error) {
    throw error;
  }  
}

const episode = (title: string, checkoutsum: number, url: string): Episode => {
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
