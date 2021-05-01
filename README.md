## Canonic Gatsby Source Plugin

A Gatsby source plugin to pull data from Canonic APIs. Once installed, your API can be queried from within Gatsby using GraphQL.

![Release](https://github.com/canonic-dev/gatsby-source-canonic/workflows/Release/badge.svg?branch=main)
[![npm version](https://badge.fury.io/js/gatsby-source-canonic.svg)](https://www.npmjs.com/package/gatsby-source-canonic)
[![Discord](https://img.shields.io/discord/765119429171609600?color=%237389D8&label=Discord&logo=discord&logoColor=%23FFF)](https://discord.gg/9dyytsM) 


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
      options: {
        url: "YOUR_API_URL",
        apiKey: process.env.CANONIC_ACCESS_TOKEN
      }
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

#### Join the thriving 🌎 [Discord](https://discord.gg/9dyytsM) community to get help and share and brainstorm ideas.
