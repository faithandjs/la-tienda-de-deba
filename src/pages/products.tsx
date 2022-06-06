import { graphql, PageProps } from 'gatsby';
import ProductCard from '@/components/ProductCard';
import React from 'react';
import { productsProp,productProp } from 'type';
import useStore from '@/context/StoreContext';
const Products = ({ data }: productsProp) => {


  console.log(data, 'usestore', useStore());
  return (
    <div>
      {data.allShopifyProduct.edges.map((product, index) => (
        <ProductCard product={product} key={index}/>
      ))}
    </div>
  );
};

export const query = graphql`
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
`;
export default Products;
