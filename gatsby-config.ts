import type { GatsbyConfig } from 'gatsby';
require('dotenv').config();
const config: GatsbyConfig = {
  plugins: [
    `gatsby-plugin-sass`,
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-mantine',
    {
      resolve: 'gatsby-source-shopify',
      options: {
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        password: process.env.GATSBY_SHOPIFY_APP_PASSWORD,
        shopifyConnections: ['collections'], // source product collections too
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/android-chrome-512x512.png',
      },
    },
  ],
  jsxRuntime: `automatic`,
};

export default config;
