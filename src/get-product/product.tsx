import React from 'react';
import { productDetails } from 'type';
interface prop {
    product:productDetails
}
const Product = ({ pageContext }: any) => {
   const { description, featuredImage, handle, priceRangeV2, title, variants } =pageContext;
  console.log(pageContext);
  return <div></div>;
};

export default Product;
