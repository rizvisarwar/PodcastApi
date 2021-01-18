import { Router } from "express";
import { Episode } from "./typings/entities";
import { Episodes } from "./typings/responses";
import axios from "axios";

const utility = require("./utility");
const router: Router = Router();
let mp3Data: any;

router.get("/episodes/metadata/", (request, response) => {
  let queryParam = request.query.rss;
  let result: Episodes = [];

  utility.fetchXML(queryParam)
    .then((xmlData:any) => {
      try {
        let item: any = utility.getItemFromXML(xmlData);

        for (let i of item) {
          let data: Episode = episode(i.title, 123, i.link);
          // fetchMP3(i.enclosure.attr["@_url"])
          // .then((resMP3) => {
          //   let tt = mp3Data;
          // });
          result.push(data);
        }
      } catch (error) {
        response.status(500).send({ error: error.message });
      }
      response.send(result);
    })
    .catch(function (error:any) {
      response
        .status(404)
        .send({ error: "Xml not found. Please check if the URL is correct!" });
    });
});

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

const fetchMP3 = (input: string) => {
  return axios
    .get(input)
    .then(function (response) {
      // handle success
      mp3Data = response.data;
    })
    .catch(function (error) {
      // handle error
      throw error;
    })
    .then(function () {
      // always executed
    });
};

module.exports = router;

export default router;
