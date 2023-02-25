// import notification from '@/utils/notifiction';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import notification from '@/utils/notifiction';
import Client from 'shopify-buy';
import { productProp, cartProp } from '../../type';
interface contextProp {
  children: JSX.Element;
}

const client = Client.buildClient({
  domain: process.env.GATSBY_SHOPIFY_STORE_URL!,
  storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN!,
});
interface contextProps {
  addToCart: ({ quantity, variant }: cartProp) => Promise<void>;
  passed: React.MutableRefObject<boolean>;
  deleteFromCart: (lineItemIdsToRemove: string[]) => Promise<void>;
  currentCheckout: any;
  editWishlist: (product: productProp) => void;
  wishlist: productProp[];
  setfilling: (title: string) => '#fc0000e7' | 'transparent';
  submitting: boolean;
}
const StoreContext = createContext({} as contextProps);
const { Provider } = StoreContext;

export const Context = ({ children }: contextProp) => {
  const browser = typeof window !== `undefined`;
  const shopifyCheckoutID = 'shopify-checkout-ID';
  const shopifyCart = 'shopify-cart';
  const shopifyWishlist = 'shopify-wishlist';
  const [checkoutID, setCheckoutID] = useState<any>(null);
  const [currentCheckout, setCurrentCheckout] = useState<any>('');
  const [wishlist, setWishlist] = useState<productProp[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const initialSet = useRef(false);
  const passed = useRef(false);

  const setfilling = (title: string) => {
    let fill: '#fc0000e7' | 'transparent' = 'transparent';
    wishlist
      ? wishlist.find((item: productProp) => item.node.title === title)
        ? (fill = '#fc0000e7')
        : (fill = 'transparent')
      : null;
    return fill;
  };
  const savingWishlist = (savewishlist: any = wishlist) => {
    localStorage.setItem(shopifyWishlist, JSON.stringify(savewishlist));
  };

  //SETT
  const settingCheckout = (checkout: any) => {
    if (browser) {
      localStorage.setItem(shopifyCheckoutID, checkout.id);
    }
    setCurrentCheckout(checkout);
  };

  const gettingCheckoutID = async () => {
    const oldCheckoutId = localStorage.getItem(shopifyCheckoutID)
      ? localStorage.getItem(shopifyCheckoutID)
      : null;
    const oldWishlist = localStorage.getItem(shopifyWishlist)
      ? JSON.parse(localStorage.getItem(shopifyWishlist)!)
      : [];

    if (oldCheckoutId) {
      setCheckoutID(oldCheckoutId);
      if (oldWishlist.length > 1) setWishlist(oldWishlist);
      await client.checkout.fetch(oldCheckoutId).then((checkout) => {
        settingCheckout(checkout);
      });
    } else {
      await client.checkout.create().then((checkout) => {
        settingCheckout(checkout);
      });
    }
  };
  useEffect(() => {
    if (browser && !checkoutID) {
      gettingCheckoutID();
      passed.current = true;
    }
  }, [localStorage.getItem(shopifyCheckoutID)]);

  useEffect(() => {
    if (initialSet.current) {
      savingWishlist();
    }
  }, [wishlist, currentCheckout]);

  const addToCart = async ({ quantity, variant }: cartProp) => {
    setSubmitting(true);
    if (!initialSet.current) initialSet.current = true;

    if (typeof checkoutID === 'undefined') {
      await gettingCheckoutID();
      addToCart({ quantity, variant });
    }

    const lineItemsToAdd = [
      {
        variantId: variant,
        quantity: quantity,
      },
    ];

    await client.checkout
      .addLineItems(checkoutID, lineItemsToAdd)
      .then((checkout) => {
        settingCheckout(checkout);
        notification({ message: 'added successfully', type: 'success' });
      })
      .catch((e) =>
        notification({ message: 'add unsuccessful', type: 'error' }),
      );
    setSubmitting(false);
  };
  const editWishlist = (product: productProp) => {
    if (!initialSet.current) initialSet.current = true;
    let tempWL: productProp[] = [];
    if (wishlist.length === 0) {
      tempWL = [product];
    } else {
      if (wishlist.find((item) => item.node.title === product.node.title)) {
        tempWL = wishlist.filter(
          (item) => item.node.title !== product.node.title,
        );
      } else {
        tempWL = [...wishlist, product];
      }
    }
    setWishlist(tempWL);
    return;
  };

  const deleteFromCart = async (lineItemIdsToRemove: string[]) => {
    if (!initialSet.current) initialSet.current = true;
    if (typeof checkoutID === 'undefined') {
      await gettingCheckoutID();
    }
    if (currentCheckout.lineItems < 1) {
      return;
    }

    await client.checkout
      .removeLineItems(checkoutID, lineItemIdsToRemove)
      .then((checkout) => {
        settingCheckout(checkout);

        notification({ message: 'deleted successfully', type: 'success' });
      })
      .catch((e) =>
        notification({ message: 'delete unsuccessful', type: 'error' }),
      );
  };

  const value = useMemo(
    () => ({
      addToCart,
      passed,
      deleteFromCart,
      currentCheckout,
      editWishlist,
      wishlist,
      setfilling,
      submitting,
    }),
    [
      addToCart,
      deleteFromCart,
      currentCheckout,
      passed,
      editWishlist,
      wishlist,
      setfilling,
      submitting,
    ],
  );
  return <Provider value={value}>{children}</Provider>;
};

const useStoreContext = () => {
  const context = useContext(StoreContext);

  return context;
};

export default useStoreContext;
