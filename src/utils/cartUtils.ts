import api from "../api/axios";
import { debounce } from "lodash";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};


type Cart = {
  items: CartItem[];
};

const CART_KEY = "guestCart";

export function saveCartToLocalStorage(cart: Cart) {
  try {
    
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error("Error saving cart:", err);
  }
}

export function loadCartFromLocalStorage(): Cart {
  try {
    const stored = localStorage.getItem(CART_KEY);
    
    return stored ? JSON.parse(stored) : { items: [] };
  } catch (err) {
    console.error("Error loading cart:", err);
    return { items: [] };
  }
}

export function clearCartFromLocalStorage() {
  try {
    localStorage.removeItem(CART_KEY);
  } catch (err) {
    console.error("Error clearing cart:", err);
  }
}

export async function fetchCart (userId?: number): Promise<Cart> {
  
  try {
    if (userId) {
      const { data } = await api.get(`api/cart/${userId}`);
     
      return { items: data.items };

    } else {
      return loadCartFromLocalStorage();
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    return { items: [] };
  }
};

export const updateCart = async (userId: number, items: CartItem[]) => {
  try {
    const itemsToUpdate = items.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    await api.put(`/api/cart/update/${userId}`, { items: itemsToUpdate });

  } catch (err) {
    console.error("Error updating cart:", err);
  }
}

export const debouncedSyncCartUpdate = debounce(updateCart, 1000);