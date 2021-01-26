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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
let episodes = [];
function getItemsFromRSS(url, callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        let Parser = require("rss-parser");
        let parser = new Parser();
        try {
            let response = yield parser.parseURL(url);
            const slicedItems = response.items.slice(0, 50);
            slicedItems.map(mapMetaData);
            callBack(episodes);
        }
        catch (error) {
            throw error;
        }
        finally {
            episodes = [];
        }
    });
}
function mapMetaData(item) {
    // const res = axios.get(item.enclosure.url);
    let data = episode(item.title, generateChecksum(item.enclosure.url), item.link);
    episodes.push(data);
}
function generateChecksum(str) {
    return crypto_1.default.createHash("md5").update(str, "utf8").digest("hex");
}
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
module.exports = { getItemsFromRSS };
