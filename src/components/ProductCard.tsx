import React from 'react';
import { productCardProp } from 'type';
import { Link } from 'gatsby';
const ProductCard = ({ product }: productCardProp) => {
  const { description, featuredImage, handle, priceRangeV2, title, variants } =
    product.node;
  return (
    <div>
      <Link to={`/products/${handle}`}>
          <h1>{title}</h1>
          <div>
            <img src={featuredImage.src} alt={`image of ${title}`} />
          </div>
          <p>{description}</p>
          <p>{handle}</p>
          <p>{priceRangeV2.maxVariantPrice.amount} </p>
          <ul>
            {variants.map((item, index) => {
              return <li key={index}>{item.shopifyId} </li>;
            })}
          </ul>
      </Link>
    </div>
  );
};

export default ProductCard;
