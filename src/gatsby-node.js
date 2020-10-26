const fetchData = require("./utils/fetchData");
const introspect = require("./utils/introspect");
const Key = require("./utils/key");

/**
 * Called by Gatsby to fetch data from source
 *
 * We make an introspection query to get all the data
 * based on the introspection we make further api calls
 * to actually get the data from Canonic.
 */
exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId },
  options
) => {
  // validation
  if (!options.url) throw Error("Please provide your Canonic project's url");
  if (!options.apiKey)
    throw Error("Please provide your Canonic project's apiKey");

  const baseUrl = `${options.url}/api/__canonic-internal`;
  // make the instrospection call
  await introspect(baseUrl, options.apiKey)
    .then((compounds) =>
      Promise.all(
        // loop through all the tables and fetch their data
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
      // once the data is fetched, call the createNode action
      // provided by Gatsby to register all the data nodes.
      response.flat().map(({ $type, ...item }) => {
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
