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
      const itemExists = state.cartItems?.find(
        (item) => item.id === action.payload.id
      );
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems?.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [{ ...action.payload, quantity: 1 }, ...state.cartItems],
      };
    }
    case "ADD_MULTIPLE_TO_CART": {
      const updatedCartItems = [...state.cartItems];
      action.payload.forEach((newItem) => {
        const itemExists = updatedCartItems.find(
          (item) => item.id === newItem.product_id
        );
        if (itemExists) {
          itemExists.quantity += newItem.quantity || 1; // Default to 1 if quantity is not provided
        } else {
          updatedCartItems.push({
            ...newItem,
            quantity: newItem.quantity || 1,
            id: newItem.product_id || newItem.id,
          });
        }
      });
      return { ...state, cartItems: updatedCartItems };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems?.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems?.map((item) =>
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

export function POSCartProvider({ children }) {
  // Load initial state from localStorage
  const loadCartFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("posCart");
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
      localStorage.setItem("posCart", JSON.stringify(state));
    }
  }, [state]);

  const showDialog = (message) => {
    setDialogMessage(message);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const addToCart = (product, isShowDialog = false) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    // isShowDialog && showDialog(`${product.title} has been added to the cart.`);
  };

  const addMultipleToCart = (products, isShowDialog = false) => {
    dispatch({ type: "ADD_MULTIPLE_TO_CART", payload: products });
    // isShowDialog && showDialog("Multiple items have been added to the cart.");
  };

  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
    // showDialog(`${product.title} has been removed from the cart.`);
  };

  const handleQuantityChange = (id, delta) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, delta },
    });
  };

  const clearCart = (isShowDialog = false) => {
    dispatch({ type: "CLEAR_CART" });
    // isShowDialog && showDialog("Your cart has been cleared.");
  };

  const getTotalItemCount = () => {
    return state.cartItems?.length; // Access length directly, not as a method
  };
  const getTotalPrice = () => {
    return state.cartItems?.reduce(
      (total, item) =>
        total +
        (item.price - item.price * (item.discount / 100)) * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        clearCart,
        handleQuantityChange,
        getTotalItemCount,
        getTotalPrice,
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
export function usePOSCart() {
  return useContext(CartContext);
}
