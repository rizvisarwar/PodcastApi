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
function getItemFromXML(xmlData) {
    let parser = require("fast-xml-parser");
    let options = {
        attributeNamePrefix: "@_",
        attrNodeName: "attr",
        textNodeName: "#text",
        ignoreAttributes: false,
        ignoreNameSpace: false,
        allowBooleanAttributes: false,
        parseNodeValue: true,
        parseAttributeValue: false,
        trimValues: true,
        cdataTagName: "__cdata",
        cdataPositionChar: "\\c",
        parseTrueNumberOnly: false,
        arrayMode: false,
        stopNodes: ["parse-me-as-string"],
    };
    let jsonObj = parser.parse(xmlData, options, true);
    return jsonObj.rss.channel.item;
}
function fetchXML(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default
                .get(url);
            // handle success
            return response.data;
        }
        catch (error) {
            // handle error
            throw error;
        }
    });
}
;
module.exports = { getItemFromXML, fetchXML };
