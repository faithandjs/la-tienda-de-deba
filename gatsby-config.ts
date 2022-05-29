import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins: [
    {
      resolve: 'gatsby-source-shopify',
      options: {
        password: process.env.SHOPIFY_APP_PASSWORD,
        storeUrl: process.env.GATSBY_MYSHOPIFY_URL,
        salesChannel: process.env.SHOPIFY_APP_ID, // Optional but recommended
      },
    },
    'gatsby-plugin-image',
  ],
  jsxRuntime: `automatic`,
};
export default config;
