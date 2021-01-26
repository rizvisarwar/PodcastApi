"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utility = require("./utility");
const router = express_1.Router();
router.get("/episodes/metadata/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let queryParam = request.query.rss;
    utility.getItemsFromRSS(queryParam, function callback(data) {
        response.send(data);
    })
        .catch(function (error) {
        response
            .status(404)
            .send({ error: "Data not found. Please check if the URL is correct!" });
    });
}));
// module.exports = router;
exports.default = router;
