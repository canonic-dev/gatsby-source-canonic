const fetch = require("node-fetch");

module.exports = function fetchData(url, apiKey) {
  return fetch(url, { headers: { Authorization: apiKey } }).then((res) =>
    res.json()
  );
};
