const fetchData = require("./fetchData");

module.exports = function introspect(baseUrl, apiKey) {
  return fetchData(`${baseUrl}/introspect/graph`, apiKey).then(
    ({ data }) => data
  );
};
