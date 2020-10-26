const fetchData = require("./utils/fetchData");
const introspect = require("./utils/introspect");
const Key = require("./utils/key");

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId },
  options
) => {
  if (!options.url) throw Error("Please provide your Canonic project's url");
  if (!options.apiKey)
    throw Error("Please provide your Canonic project's apiKey");

  const baseUrl = `${options.url}/api/__canonic-internal`;
  introspect(baseUrl, options.apiKey)
    .then((compounds) =>
      Promise.all(
        compounds.map(({ key }) => {
          const url = `${baseUrl}/${new Key(key).plural}`;
          return fetchData(url, options.apiKey).then(({ data }) =>
            data.map((item) => ({
              ...item,
              $type: `${new Key(key).singular.capitalize}`,
            }))
          );
        })
      )
    )
    .then((response) =>
      response.flat().forEach(({ $type, ...item }) => {
        actions.createNode({
          ...item,
          id: createNodeId(item._id),
          parent: null,
          children: [],
          internal: {
            type: $type,
            content: JSON.stringify(item),
            contentDigest: createContentDigest(item),
          },
        });
      })
    )
    .catch((e) => {
      throw Error(`Error fetching Canonic data: ${e}`);
    });
};
