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
    await response.reduce(
      async (
        promise: any,
        item: { enclosure: { url: string }; title: string; link: string }
      ) => {
        await promise;
        const res = await axios.get(item.enclosure.url);
        let data: Episode = episode(
          item.title,
          generateChecksum(res.data),
          item.link
        );
        episodes.push(data);

        // getChecksum(item.enclosure.url).then((checksum: any) => {
        //             let data: Episode = episode(item.title, checksum, item.link);
        //             episodes.push(data);
        //           });
      },
      Promise.resolve()
    );

    // await Promise.all(response.items.map(async (item: { enclosure: { url: string; }; title: string; link: string; }) => {
    //   // const checksum = await getChecksum(item.enclosure.url);
    //   // let data: Episode = episode(item.title, "123", item.link);
    //   // episodes.push(data);

    //   await getChecksum(item.enclosure.url).then((checksum: any) => {
    //           let data: Episode = episode(item.title, checksum, item.link);
    //           episodes.push(data);
    //         });
    // }));

    // response.items.forEach(
    //   async (item: { title: string; link: string; enclosure: any }) => {
    //     // const aa = getChecksum(item.enclosure.url);
    //     // let data: Episode = episode(item.title, "123", item.link);
    //     // episodes.push(data);

    //     await getChecksum(item.enclosure.url).then((checksum: any) => {
    //       let data: Episode = episode(item.title, checksum, item.link);
    //       episodes.push(data);
    //     });
    //   }
    // );
    return episodes;
  } catch (error) {
    throw error;
  }
}

async function getChecksum(input: string) {
  let a = 2;
  let b = 3;
  let c = a + b;

  // try {

  // const response = await axios.get(input);
  // return "test";
  // return generateChecksum(response.data);

  //   // .then(function (response) {
  //   //   // handle success
  //   //   let mp3Data = response.data;
  //   //   return generateChecksum(mp3Data);
  //   // })
  //   // .catch(function (error) {
  //   //   // handle error
  //   //   throw error;
  //   // });
  //   // handle success
  //   // return response.data;
  // } catch (error) {
  //   // handle error
  //   throw error;
  // }

  axios
    .get(input)
    .then(function (response) {
      // handle success
      let mp3Data = response.data;
      let cs = generateChecksum(mp3Data);
      return cs;
    })
    .catch(function (error) {
      // handle error
      throw error;
    })
    .then(function () {
      // always executed
    });
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
