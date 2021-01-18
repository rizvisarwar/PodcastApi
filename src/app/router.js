"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const utility = require("./utility");
const router = express_1.Router();
let mp3Data;
router.get("/episodes/metadata/", (request, response) => {
    let queryParam = request.query.rss;
    let result = [];
    utility.fetchXML(queryParam)
        .then((xmlData) => {
        try {
            let item = utility.getItemFromXML(xmlData);
            for (let i of item) {
                let data = episode(i.title, 123, i.link);
                // fetchMP3(i.enclosure.attr["@_url"])
                // .then((resMP3) => {
                //   let tt = mp3Data;
                // });
                result.push(data);
            }
        }
        catch (error) {
            response.status(500).send({ error: error.message });
        }
        response.send(result);
    })
        .catch(function (error) {
        response
            .status(404)
            .send({ error: "Xml not found. Please check if the URL is correct!" });
    });
});
const episode = (title, checkoutsum, url) => {
    try {
        return {
            title: title,
            checkoutsum: checkoutsum,
            url: url,
        };
    }
    catch (err) {
        return {
            title: title,
            checkoutsum: checkoutsum,
            url: url,
        };
    }
};
const fetchMP3 = (input) => {
    return axios_1.default
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
exports.default = router;
