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
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
function getItemsFromRSS(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let Parser = require("rss-parser");
        let parser = new Parser();
        let episodes = [];
        try {
            let response = yield parser.parseURL(url);
            let firstItem = [response.items[0]];
            yield firstItem.reduce((promise, item) => __awaiter(this, void 0, void 0, function* () {
                yield promise;
                const res = yield axios_1.default.get(item.enclosure.url);
                let data = episode(item.title, generateChecksum(res.data), item.link);
                episodes.push(data);
                // getChecksum(item.enclosure.url).then((checksum: any) => {
                //             let data: Episode = episode(item.title, checksum, item.link);
                //             episodes.push(data);
                //           });
            }), Promise.resolve());
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
        }
        catch (error) {
            throw error;
        }
    });
}
function getChecksum(input) {
    return __awaiter(this, void 0, void 0, function* () {
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
        axios_1.default
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
    });
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
