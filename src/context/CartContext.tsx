import { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import { saveCartToLocalStorage, clearCartFromLocalStorage, debouncedSyncCartUpdate } from "../utils/cartUtils";
import { useAuth } from "../hooks/useAuth";
import { fetchCart } from "../utils/cartUtils";
import syncCartOnLogin from "../utils/syncCart";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export type CartState = {
  items: CartItem[];
}

const cartActionVars = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  SET_CART: "SET_CART"
} as const;
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: CartState };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: { items: [] },
  dispatch: () => null,
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  console.log("CartReducer called with action:", action);
  console.log("Current cart state in C reducer function:", state);
  switch (action.type) {
    case cartActionVars.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case cartActionVars.REMOVE_ITEM: { 
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      }
    }
    case cartActionVars.UPDATE_QUANTITY: { 
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, item.quantity + action.payload.quantity) }
            : item
        ),
      };
    }
    case cartActionVars.CLEAR_CART: {
      return {
        ...state,
        items: [],
      };
     }

     case cartActionVars.SET_CART: {
      return {
        ...state,
        items: action.payload.items,
      };
    }

     default:
      return state;
  }

};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const { user } = useAuth();

  console.log("Cart state initialized in cart provider:", state);


  const handleSyncCart = async (userId: number) => {
       
    console.log('this is user Id in handleSyncCart:', userId);
     await syncCartOnLogin(userId, state, dispatch );
     console.log('Cart synced successfully');
     clearCartFromLocalStorage();
 }

  useEffect(() => {
    const load = async () => {
      console.log('user i d')
      const cart = await fetchCart(user?.id);
      console.log("Loaded cart:", cart);
      dispatch({ type: "SET_CART", payload: cart });
      if (user) {
        handleSyncCart(user.id);
      }
      //console.log("Cart state after loading:", state);
    };
    load();
        
  }, [user]);

  useEffect(() => {
    console.log("Cart state changed:", state);
    saveCartToLocalStorage(state);

    if(user) {
      debouncedSyncCartUpdate(user.id, state.items);
    }
  }, [state]);



  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};