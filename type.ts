export interface productDetails {
  description: string;
    featuredImage: {
      src: string;
    };
    id: string;
    handle: string;
    priceRangeV2: {
      maxVariantPrice: {
        amount: number;
      };
    };
    title: string;
    variants: { shopifyId: string }[];
}
export interface productProp {
  node: productDetails;
}
export interface productsProp {
  data: {
    allShopifyProduct: {
      edges: productProp[];
    };
  };
}
export interface productCardProp {
  product: productProp;
}
