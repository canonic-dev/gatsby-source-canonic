## Canonic Gatsby Source Plugin

A Gatsby source plugin to pull data from Canonic APIs. Once installed, your API can be queried from within Gatsby using GraphQL.


### Install

```
yarn add gatsby-source-canonic
```


### Configureation

After installing the plugin, use and configure the plugin by modifying your site's `gatsby-config.js`.

```js
// gatsby.config.js

module.exports = {
  plugins: [
    //...other plugins
    {
      resolve: 'gatsby-source-canonic',
      apiKey: process.env.CANONIC_ACCESS_TOKEN
    }
  ]
}
```

It's recommended to use [`dotenv`](https://docs.canonic.dev/recipes/creating-content-apis) to configure env variables and store the token there.

> You can create an access token by visiting the settings page of your Canonic project. [Read More](https://docs.canonic.dev/recipes/creating-content-apis)


### Usage

Once the plugin is configured, you can query for Canonic data as you would from any other source

```gql
{
  allTABLE_NAME {
    edges {
      node {
        _id
        ...
      }
    }
  }
}
```

> `TABLE_NAME` is the key for the table corresponding to Canonic. So if you created a table called `movies`, the query name would be `allMovie`

You can read more on how to write more advanced queries [here](https://www.gatsbyjs.com/docs/graphql-reference/)
