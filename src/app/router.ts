import { Router } from "express";

const utility = require("./utility");
const router: Router = Router();

router.get("/episodes/metadata/", async (request, response) => {
  let queryParam = request.query.rss;

  utility.getItemsFromRSS(queryParam, function callback(data: any) {
    response.send(data);
  })
  .catch(function (error:any) {
    response
      .status(404)
      .send({ error: "Data not found. Please check if the URL is correct!" });
  });
});

module.exports = router;

export default router;
