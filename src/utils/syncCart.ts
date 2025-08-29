import api from "../api/axios";
import type CartItem from "../components/CartItem";

interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    product?: {
      id: string;
      name: string;
      price: number;
      description: string;
      images?: { id: string; url: string }[];
    };
  }
  
  interface GetCartResponse {
    items: CartItem[];
  }

async function syncCartOnLogin (userId: number, state: any, dispatch: any) {
    const localCart = state;

    const mappedGuestItems = localCart.items.map((item: CartItem) => ({
      ...item,
      productId: item.id, 
    }));


    try {
        const response = await api.post<GetCartResponse>(`api/cart/merge/${userId}`, { guestItems: mappedGuestItems });
        const mergedCartItems = response.data.items;
     
        dispatch({ type: "CLEAR_CART" });
       mergedCartItems.forEach(item => {
        
        const normalizedItem: any = {
          id: item.productId,
          name: item.product?.name,
          price: item.product?.price,
          image: item.product?.images?.[0]?.url,
          quantity: item.quantity,
        };
          dispatch({ type: "ADD_ITEM", payload: normalizedItem });
        });
      } catch (err) {
        console.error("Error syncing cart:", err);
      }
};



export default syncCartOnLogin;