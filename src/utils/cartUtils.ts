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
    console.log("Saving cart to local storage:", cart);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error("Error saving cart:", err);
  }
}

export function loadCartFromLocalStorage(): Cart {
  try {
    const stored = localStorage.getItem(CART_KEY);
    console.log("Loading cart from local storage:", stored);
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
  console.log("in fetch cart function")
  try {
    if (userId) {
      console.log("Fetching cart from server:");
      console.log("this is user Id", userId);
      const response = await api.get(`api/cart/${userId}`);
      console.log("Response from server:", response);
      const { data } = await api.get(`api/cart/${userId}`);
      console.log("Fetched cart from server:", data);
      //saveCartToLocalStorage(data);
      return { items: data.items };

    } else {
      console.log("No user ID provided, loading cart from local storage.");
      console.log('logging',loadCartFromLocalStorage());
      return loadCartFromLocalStorage();
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    console.log("Returning empty cart.");
    return { items: [] };
  }
};

export const updateCart = async (userId: number, items: CartItem[]) => {
  try {
    const itemsToUpdate = items.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    console.log("Updating cart for user:", userId);
    console.log("Items to update:", itemsToUpdate);

    await api.put(`/api/cart/update/${userId}`, { items: itemsToUpdate });
    console.log("Cart updated successfully");
  } catch (err) {
    console.error("Error updating cart:", err);
  }
}

export const debouncedSyncCartUpdate = debounce(updateCart, 1000);