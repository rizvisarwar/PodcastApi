const utility = require("../utility");

test('Get successful result of the API call', async() => {
  const apiUrl = "https://rss.acast.com/varvet";
  await utility.getItemsFromRSS(apiUrl)
    .then(response => {
      expect(response.length).toBeGreaterThan(0);
    })
    .catch(e => {
      fail(`Expected successful response`);
    });
});

test("Get unsuccessful result of the API call", async () => {
  const apiUrl = "https://rss.acast.com/varvet121212";
  await utility
    .getItemsFromRSS(apiUrl)
    .then((response) => {
      fail(`Expected failure response`);
    })
    .catch((e) => {
      expect(e.message).toBe("Status code 404");
    });
});
