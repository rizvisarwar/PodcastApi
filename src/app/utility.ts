import axios from "axios";

function getItemFromXML(xmlData: any) {
  let parser = require("fast-xml-parser");
  let options = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    stopNodes: ["parse-me-as-string"],
  };
  let jsonObj = parser.parse(xmlData, options, true);
  return jsonObj.rss.channel.item;
}

async function fetchXML(url: any) {
    try {
      const response = await axios
        .get(url);
      // handle success
      return response.data;
    } catch (error) {
      // handle error
      throw error;
    }
  };

module.exports = { getItemFromXML, fetchXML };