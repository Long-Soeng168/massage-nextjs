"use client";

import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { MySuccessDialog } from "@/components/my-success-dialog";

// Initial cart state
const initialState = { cartItems: [] };

// Reducer to manage cart actions
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const itemExists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: Math.max(item.quantity + action.payload.delta, 1),
              }
            : item
        ),
      };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

// Context and Provider
const CartContext = createContext();

export function CartProvider({ children }) {
  // Load initial state from localStorage
  const loadCartFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : initialState;
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(cartReducer, loadCartFromLocalStorage());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    // Save cart data to localStorage whenever cartItems change
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(state));
    }
  }, [state]);

  const showDialog = (message) => {
    setDialogMessage(message);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const addToCart = (product, isShowDialog = true) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    isShowDialog && showDialog(`${product.title} has been added to the cart.`);
  };

  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
    showDialog(`${product.title} has been removed from the cart.`);
  };

  const handleQuantityChange = (id, delta) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, delta },
    });
  };

  const clearCart = ({isShowDialog = true}) => {
    dispatch({ type: "CLEAR_CART" });
    isShowDialog && showDialog("Your cart has been cleared.");
  };

  const getTotalItemCount = () => {
    return state.cartItems.length; // Access length directly, not as a method
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        handleQuantityChange,
        getTotalItemCount,
      }}
    >
      {children}
      <MySuccessDialog
        isOpen={isDialogOpen}
        message={dialogMessage}
        onClose={closeDialog}
      />
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  return useContext(CartContext);
}
