const fetch = require("node-fetch");

/**
 * Makes an api call and returns the data after parsing it as
 * json.
 * @param {string} url Canonic api endpoint
 * @param {string} apiKey Canonic access token
 * @returns {Promise} a promise that resolves with the json data
 */
module.exports = function fetchData(url, apiKey) {
  return fetch(url, { headers: { Authorization: apiKey } }).then((res) =>
    res.json()
  );
};
