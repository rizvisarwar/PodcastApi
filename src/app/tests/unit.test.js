const utility = require("../utility");

test('Get successful result of the API call', async() => {
  const apiUrl = "https://rss.acast.com/varvet";
  await utility.fetchXML(apiUrl)
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
    .fetchXML(apiUrl)
    .then((response) => {
      fail(`Expected failure response`);
    })
    .catch((e) => {
      expect(e.response.status).toBeGreaterThanOrEqual(400);
      expect(e.response.status).toBeLessThan(500);
    });
});
