import type { GatsbyNode } from 'gatsby';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
const path = require(`path`);

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            title
            handle
            variants {
              shopifyId
            }
            priceRangeV2 {
              maxVariantPrice {
                amount
              }
            }
            description
            featuredImage {
              src
            }
          }
        }
      }
    }
  `);
  console.log(result);
  // Iterate over all products and create a new page using a template
  // The product "handle" is generated automatically by Shopify
  result.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/products/${node.handle}`,
      component: path.resolve(`./src/get-product/product.tsx`),
      context: {
        product: node,
      },
    });
  });
};
