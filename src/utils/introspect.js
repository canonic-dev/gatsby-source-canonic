const fetchData = require("./fetchData");

/**
 * Performs an introspection call to return the graph that is
 * then used to make the subsequent api calls
 * @param {string} baseUrl The base url for the introspection call
 * @param {string} apiKey Canonic Access Token
 */
module.exports = function introspect(baseUrl, apiKey) {
  return fetchData(`${baseUrl}/introspect/graph`, apiKey).then(
    ({ data }) => data
  );
};
